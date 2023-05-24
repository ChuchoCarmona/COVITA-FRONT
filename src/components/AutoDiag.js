import React, { useState } from 'react';
import * as torch from 'torch';
import { transforms, models, nn } from 'torch';
import { Button } from 'react-bootstrap';

const ImageAnalyzer = () => {
    const [imageResult, setImageResult] = useState(null);
  
    const handleImageUpload = async (event) => {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        await analyzeImage(imageData);
      };
      reader.readAsDataURL(image);
    };
  
    const analyzeImage = async (imageData) => {
      // Convertir imagen a tensor utilizando las transformaciones
      const transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
          [0.485, 0.456, 0.406],
          [0.229, 0.224, 0.225]
        )
      ]);
      const imageTensor = torch.tensor(transform(imageData));
      const imageTensorBatch = imageTensor.unsqueeze(0);
  
      // Cargar el modelo y realizar la predicción
      const model = models.resnet18();
      model.fc = nn.Linear(512, 3);
      await model.load('./Modelo/CovidModel.pt');
      model.eval();
      const output = model(imageTensorBatch);
      const probs = torch.nn.functional.softmax(output, 1)[0];
  
      // Guardar los resultados en el estado
      setImageResult(probs);
    };
  
    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageResult && (
          <div>
            <h3>Probabilidades:</h3>
            <p>COVID: {imageResult[0] * 100}%</p>
          </div>
        )}
      </div>
    );
  };
  
  export default ImageAnalyzer;
  