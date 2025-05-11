import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as tf from '@tensorflow/tfjs';

interface ModelContextType {
  model: tf.LayersModel | null;
  isModelLoading: boolean;
  modelError: string | null;
  uploadedImage: string | null;
  predictions: any[] | null;
  setUploadedImage: (image: string | null) => void;
  setPredictions: (predictions: any[] | null) => void;
  predict: (imageData: ImageData) => Promise<any>;
  modelReady: boolean;
  loadModelFromJson: (jsonUrl: string) => Promise<void>;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModel = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};

interface ModelProviderProps {
  children: ReactNode;
}

const DEFAULT_CLASSES = [
  'Acne and Rosacea',
  'Benign',
  'Eczema',
  'malignant',
  'Melanoma Skin Cancer Nevi and Moles'
];

interface WeightSpec {
  name: string;
  shape: number[];
  dtype: string;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[] | null>(null);
  const [modelReady, setModelReady] = useState<boolean>(false);

  const loadModelFromJson = async (jsonUrl: string) => {
    try {
      setIsModelLoading(true);
      setModelError(null);

      // Load the model topology
      const response = await fetch(jsonUrl);
      const modelJson = await response.json();

      // Create a new model with explicit input shape
      const model = tf.sequential();
      model.add(tf.layers.inputLayer({ inputShape: [64, 64, 3] }));

      // Add the remaining layers from the model topology
      const layers = modelJson.modelTopology.model_config.config.layers.slice(1);
      for (const layerConfig of layers) {
        const config = { ...layerConfig.config };
        
        // Convert Keras parameter names to TensorFlow.js parameter names
        if (config.kernel_size) {
          config.kernelSize = config.kernel_size;
          delete config.kernel_size;
        }
        if (config.pool_size) {
          config.poolSize = config.pool_size;
          delete config.pool_size;
        }
        if (config.data_format) {
          config.dataFormat = config.data_format === 'channels_last' ? 'channelsLast' : 'channelsFirst';
          delete config.data_format;
        }

        let layer;
        switch (layerConfig.class_name) {
          case 'Conv2D':
            layer = tf.layers.conv2d(config);
            break;
          case 'MaxPooling2D':
            layer = tf.layers.maxPooling2d(config);
            break;
          case 'Flatten':
            layer = tf.layers.flatten(config);
            break;
          case 'Dense':
            layer = tf.layers.dense(config);
            break;
          case 'Dropout':
            layer = tf.layers.dropout(config);
            break;
          default:
            throw new Error(`Unsupported layer type: ${layerConfig.class_name}`);
        }
        
        model.add(layer);
      }

      // Load weights
      const weightsPath = modelJson.weightsManifest[0].paths[0];
      const weightsUrl = jsonUrl.substring(0, jsonUrl.lastIndexOf('/') + 1) + weightsPath;
      const weightsResponse = await fetch(weightsUrl);
      const weightsData = await weightsResponse.arrayBuffer();

      // Create weight tensors
      const weightSpecs = modelJson.weightsManifest[0].weights;
      let offset = 0;
      const weightData = new Float32Array(weightsData);
      const weightTensors = weightSpecs.map((spec: WeightSpec) => {
        const size = spec.shape.reduce((a: number, b: number) => a * b, 1);
        const tensor = tf.tensor(
          weightData.slice(offset, offset + size),
          spec.shape
        );
        offset += size;
        return tensor;
      });

      // Set the weights
      model.setWeights(weightTensors);

      // Compile the model
      model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      setModel(model);
      setModelReady(true);
    } catch (error) {
      console.error("Error loading model:", error);
      setModelError("Failed to load the model. Please check the JSON file and try again.");
    } finally {
      setIsModelLoading(false);
    }
  };

  const preprocessImage = async (imageData: ImageData): Promise<tf.Tensor> => {
    return tf.tidy(() => {
      const tensor = tf.browser.fromPixels(imageData);
      const resized = tf.image.resizeBilinear(tensor, [64, 64]);
      const normalized = resized.div(tf.scalar(255));
      return normalized.expandDims(0);
    });
  };

  const predict = async (imageData: ImageData) => {
    if (!model || !modelReady) {
      throw new Error('Model is not ready');
    }

    try {
      const processedImage = await preprocessImage(imageData);
      const predictions = await model.predict(processedImage) as tf.Tensor;
      const predictionArray = await predictions.data();
      
      processedImage.dispose();
      predictions.dispose();
      
      return Array.from(predictionArray)
        .map((probability, index) => ({
          class: DEFAULT_CLASSES[index],
          probability: probability
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 1);
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  };

  const value = {
    model,
    isModelLoading,
    modelError,
    uploadedImage,
    predictions,
    setUploadedImage,
    setPredictions,
    predict,
    modelReady,
    loadModelFromJson
  };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
};

export default ModelProvider;