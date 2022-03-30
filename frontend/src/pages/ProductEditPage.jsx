import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import app from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import './style2.css'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditPage(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [model, setModel] = useState('');
  const [speed, setSpeed] = useState('');
  const [type, setType] = useState('');
  const [engine, setEngine] = useState('');
  const [oldNew, setOldNew] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setModel(product.model);
      setType(product.type);
      setSpeed(product.speed);
      setEngine(product.engine);
      setOldNew(product.oldNew);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(!file){
          console.log("no file ");
           dispatch(
            updateProduct({
               _id: productId, name, price, image:image, category,  model, speed, type, engine, oldNew, countInStock, description,
            })
     );
    }else {
  
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
          getDownloadURL(uploadTask.snapshot.ref).then((img) => {
            // TODO: dispatch update product
            dispatch(
              updateProduct({
                _id: productId, name, price, image:img, category,  model, speed, type, engine, oldNew, countInStock, description,
              })
            );
          
          });
        }
        );
      };
    }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
        <Link to='/productlist'>
            <button type="button" className="btn"> Go back</button>
        </Link> 
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name"type="text" placeholder="Enter name" value={name}onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <img style={{width:200, height:150}}id="image" alt="" src={image} onChange={(e) => setImage(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input style={{width:200, height:150}} type="file"id="imageFile" onChange={(e) => setFile(e.target.files[0])} ></input>
              </div>
            <div>
              <label htmlFor="category">Category</label>
              <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="model">Model</label>
              <input id="model" type="text" placeholder="Enter model" value={model} onChange={(e) => setModel(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="speed">Speed</label>
              <input id="speed" type="text" placeholder="Speed of product" value={speed} onChange={(e) => setSpeed(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <input id="type" type="text" placeholder="Automatic or Manual" value={type} onChange={(e) => setType(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="engine">Engine Info</label>
              <input id="engine" type="text" placeholder="Diesel/ Petrol engine" value={engine} onChange={(e) => setEngine(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="oldNew">Old or New</label>
              <input id="oldNew" type="text" placeholder="Brand New or Fairly Used" value={oldNew} onChange={(e) => setOldNew(e.target.value)} ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input  id="countInStock" type="text" placeholder="How many do you have instock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3"  type="text" placeholder="Enter full detail description of product" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">  Update </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}