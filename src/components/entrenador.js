// const tf = require('tfjs-node');
// const path = require('path');
// const fs = require('fs');

// // Rutas de los directorios de imágenes de entrenamiento y prueba
// const trainImageDir = 'D:\\SEMESTRES\\SEMESTRES\\OCTAVO SEMESTRE\\TALLER DE INVESTIGACION 2\\covidNetMX\\archive\\train';
// const testImageDir = 'D:\\SEMESTRES\\SEMESTRES\\OCTAVO SEMESTRE\\TALLER DE INVESTIGACION 2\\covidNetMX\\archive\\test';

// // Rutas de los archivos de datos de entrenamiento y prueba
// const trainDataPath = 'D:\\SEMESTRES\\SEMESTRES\\OCTAVO SEMESTRE\\TALLER DE INVESTIGACION 2\\covidNetMX\\archive\\train.txt';
// const testDataPath = 'D:\\SEMESTRES\\SEMESTRES\\OCTAVO SEMESTRE\\TALLER DE INVESTIGACION 2\\covidNetMX\\archive\\test.txt';

// // Cargar los datos de entrenamiento y prueba
// const trainData = tf.data.csv(trainDataPath, { header: false, delimiter: ' ' });
// const testData = tf.data.csv(testDataPath, { header: false, delimiter: ' ' });

// // Definir el modelo base
// const baseModel = tf.keras.applications.resNet50V2({
//   weights: 'imagenet',
//   inputShape: [200, 200, 3],
//   includeTop: false
// });

// // Congelar las capas del modelo base
// for (const layer of baseModel.layers) {
//   layer.trainable = false;
// }

// // Construir el modelo
// const model = tf.keras.Sequential();
// model.add(baseModel);
// model.add(tf.keras.layers.GlobalAveragePooling2D());
// model.add(tf.keras.layers.Dense(128, { activation: 'relu' }));
// model.add(tf.keras.layers.BatchNormalization());
// model.add(tf.keras.layers.Dropout(0.2));
// model.add(tf.keras.layers.Dense(1, { activation: 'sigmoid' }));

// // Compilar el modelo
// model.compile({
//   optimizer: tf.keras.optimizers.Adam(0.001),
//   loss: 'binaryCrossentropy',
//   metrics: ['accuracy']
// });

// // Función para preprocesar las imágenes
// function preprocessImages(imagePaths) {
//   return imagePaths.map((imagePath) => {
//     const imageBuffer = fs.readFileSync(imagePath);
//     const imageTensor = tf.node.decodeImage(imageBuffer);
//     const resizedImage = tf.image.resizeBilinear(imageTensor, [200, 200]);
//     const normalizedImage = resizedImage.div(255.0);
//     return normalizedImage;
//   });
// }

// // Función para preprocesar las etiquetas
// function preprocessLabels(labels) {
//   return labels.map((label) => (label === 'positive' ? 1 : 0));
// }

// // Función para generar los lotes de datos
// async function* dataGenerator(data, imageDir) {
//   for await (const batch of data) {
//     const imagePaths = batch.x_col.map((filename) => path.join(imageDir, filename));
//     const labels = batch.y_col;

//     const images = preprocessImages(imagePaths);
//     const processedLabels = preprocessLabels(labels);

//     yield [tf.stack(images), tf.tensor(processedLabels)];
//   }
// }

// // Crear los generadores de datos de entrenamiento y prueba
// const trainGen = dataGenerator(trainData, trainImageDir);
// const testGen = dataGenerator(testData, testImageDir);

// // Entrenar el modelo
// const history = await model.fit(trainGen, {
//   epochs: 20,
//   validationData: testGen,
//   callbacks: [
//     tf.keras.callbacks.ModelCheckpoint('covid_classifier_model.tfjs', {
//       saveBestOnly: true
//     }),
//     tf.keras.callbacks.EarlyStopping({
//       patience: 3,
//       monitor: 'val_loss'
//     }),
//     tf.keras.callbacks.ReduceLROnPlateau({
//       monitor: 'val_loss',
//       factor: 0.5,
//       patience: 2
//     })
//   ]
// });

// // Guardar el modelo entrenado
// await model.save('covid_classifier_model.tfjs');

// // Evaluar el modelo con los datos de prueba
// const testLoss = model.evaluate(testGen);

// // Realizar predicciones
// const predictions = model.predict(testGen);
// const preds = predictions.arraySync();
// console.log(preds);
