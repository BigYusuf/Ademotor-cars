import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import app from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { PRODUCT_CREATE_RESET} from '../constants/productConstants';
import './style2.css'

export default function ProductCreatePage(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [model, setModel] = useState('');
  const [speed, setSpeed] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');
  const [oldNew, setOldNew] = useState('');
  const [description, setDescription] = useState('');

  const productCreate = useSelector((state) => state.productCreate);
  const {loading: loadingCreate, error: errorCreate,success: successCreate } = productCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push('/productlist');
    }
    
  }, [ dispatch, successCreate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // TODO: dispatch Create product
          const newProduct= { name, price, image: downloadURL, category, model, speed, type, year, engine, oldNew, countInStock, description};
          dispatch(
            createProduct(newProduct));
          
        });
      }
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
        <Link to='/productlist'>
            <button type="button" className="btn"> Go back</button>
        </Link> 
          <h1>Create Product </h1>
        </div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        
            <div>
              <label htmlFor="name">Name</label>
              <input id="name"type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="text" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="file">Image File</label>
              <input style={{width:200, height:150}} type="file"id="file" onChange={(e) => setFile(e.target.files[0])} ></input>
             </div>
            <div>
              <label htmlFor="category">Category</label>
              <input id="category" type="text" placeholder="Enter category" onChange={(e) => setCategory(e.target.value.split(","))}></input>
            </div>
            <div>
              <label htmlFor="model">Model</label>
              <input id="model" type="text" placeholder="Enter model" onChange={(e) => setModel(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="speed">Speed</label>
              <input id="speed" type="text" placeholder="Speed of product"  onChange={(e) => setSpeed(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <input id="type" type="text" placeholder="Automatic or Manual" onChange={(e) => setType(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="type">Year</label>
              <input id="year" type="text" placeholder="Year of Product Manufacture" onChange={(e) => setYear(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="engine">Engine Info</label>
              <input id="engine" type="text" placeholder="Diesel/ Petrol engine" onChange={(e) => setEngine(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="oldNew">Old or New</label>
              <input id="oldNew" type="text" placeholder="Brand New or Fairly Used" onChange={(e) => setOldNew(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input  id="countInStock" type="text" placeholder="How many do you have instock" onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3"  type="text" placeholder="Enter full detail description of product" onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">  Create </button>
            </div>
          
      </form>
    </div>
  );
}