import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import './productMain.css';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

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
  const [ShowUnder, setShowUnder] = useState('');
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
      setOldNew(product.ShowUnder);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(!file){
           dispatch(
            updateProduct({
               _id: productId, name, price, image:image, category,  model, speed, type, engine, oldNew, ShowUnder, countInStock, description,
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
    function handleFile(e){
      setFile(e.target.files[0])
    }
  return (
    <div className="productMain__container">
        <div className="productMain__header">
        <Link to='/productlist' className="productMain__header-button">
            <button type="button" className="btn"> Go back</button>
        </Link>
          <h1 className="productMain__title">Edit Product {productId}</h1>
        </div>
      <div >
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="productMain__body">
            <div className="product__body-container">
      <div className="product__content">
        <form className="product__form" action="#" onSubmit={submitHandler}>
          <div className="product__top-details">
            <div className="input-box">
              <span className="details">Product Image</span>
              {file ? (
              <img style={{width:200, height:150}}id="image" alt="" src={URL.createObjectURL(file)} 
              />) : (
                <img style={{width:200, height:150}}id="image" alt="" src={image} 
                onChange={(e) => setImage(e.target.value)} />)}
              
              <input type="file" id="imagefile"accept="image/*" style={{display:"none"}}
                onChange={handleFile} />
                <label htmlFor="imagefile" onChange={handleFile}className="upload-icon">
                  <i className="fa fa-upload"></i>
                </label>
            </div>
            <div className="input-box">
              <span className="details">Product Description</span>
              <textarea id="description" rows="4"  type="text" 
              placeholder="Enter full detail description of product" value={description} 
              onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <div className="input-box">
              <span className="details">Product Name</span>
              <input id="name"type="text" placeholder="Enter product name" 
                value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Price</span>
              <input type="text" id="price" placeholder="Enter price" value={price} 
               onChange={(e) => setPrice(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Category</span>
              <input id="category" type="text" placeholder="Enter category" value={category}
              onChange={(e) => setCategory(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Home display Section</span>
              <select value={ShowUnder} className="select-type"
                onChange={(e) => setShowUnder(e.target.value)}>
                  <option defaultValue value= "none">Don't display on Home</option>
                  <option value= "popular">Popular</option>
                  <option value= "featured1">Featured 1 Section</option>
                  <option value= "featured2">Featured 2 Section</option>
              </select>
            </div>
            <div className="input-box">
              <span className="details">Model</span>
              <input id="model" type="text" placeholder="Enter model" value={model} 
              onChange={(e) => setModel(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Speed</span>
              <input id="speed" type="text" placeholder="Speed of product" value={speed}
               onChange={(e) => setSpeed(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Engine Type</span>
              <input id="engine" type="text" placeholder="Diesel/ Petrol engine" value={engine} 
              onChange={(e) => setEngine(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Count in Stock</span>
              <input id="countInStock" type="number" placeholder="How many do you have instock" 
              value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required/>
            </div>
          </div>
          <div className="product__bottom-details">
          <div className="radio-details1">
            <input type="radio" name="automatic" id="dot-1" value={type} onChange={(e) => setType(e.target.value)}/>
            <input type="radio" name="manual" id="dot-2" value={type} onChange={(e) => setType(e.target.value)}/>
            <input type="radio" name="notsure" id="dot-3" value={type} onChange={(e) => setType(e.target.value)}/>
            <span className="radio-title">Type</span>
            <div className="category">
              <label htmlFor="dot-1">
              <span className="dot one"></span>
              <span className="radio-value">Automatic</span>
            </label>
            <label htmlFor="dot-2">
              <span className="dot two"></span>
              <span className="radio-value">Manual</span>
            </label>
            <label htmlFor="dot-3">
              <span className="dot three"></span>
              <span className="radio-value">Not sure</span>
              </label> 
            </div>
          </div>
          <div className="radio-details2">
            <input type="radio" name="oldNew" id="dot-4" value={oldNew} onChange={(e) => setOldNew(e.target.value)}/>
            <input type="radio" name="oldNew" id="dot-5" value={oldNew} onChange={(e) => setOldNew(e.target.value)}/>
            <input type="radio" name="oldNew" id="dot-6" value={oldNew} onChange={(e) => setOldNew(e.target.value)}/>
            <span className="radio-title">New or Old</span>
            <div className="category">
              <label htmlFor="dot-4">
              <span className="dot four"></span>
              <span className="radio-value">New</span>
            </label>
            <label htmlFor="dot-5">
              <span className="dot five"></span>
              <span className="radio-value">Fairly Used</span>
            </label>
            <label htmlFor="dot-6">
              <span className="dot six"></span>
              <span className="radio-value">Not bad</span>
              </label>
            </div>
          </div>
          </div>
          <div className="button">
              <button className="btn" type="submit">  Update </button>
          </div>
        </form>
      </div>
    </div>
          </div>
        )}
      </div>
    </div>
  );
}