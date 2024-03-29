// Firebase é um serviço do google que tem muitos serviços - um deles é o firestore
// Firestore é o banco de dados

// Códigos disponíveis no site
// Importação das funções da biblioteca do firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do firebase do app web
const firebaseConfig = {
  apiKey: "AIzaSyDVifojQFqmFPl_9yHaT0w-avi_lcrsR4Q",
  authDomain: "ducky-blog.firebaseapp.com",
  projectId: "ducky-blog",
  storageBucket: "ducky-blog.appspot.com",
  messagingSenderId: "984620698476",
  appId: "1:984620698476:web:4183f1d6b0ba1c7a028149",
};

// Inicialização do firebase
const app = initializeApp(firebaseConfig);

// Início dos código feito na mão (import getFirestore tbm)
// Pega o DB e exporta
const db = getFirestore(app);
export { db };
