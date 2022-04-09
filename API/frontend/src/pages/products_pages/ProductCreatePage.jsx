import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { PRODUCT_CREATE_RESET} from '../../constants/productConstants';
import './productMain.css';


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
  const [error123, setError123] = useState(false);
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
    if(!file){
      setError123(true);
      
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // TODO: dispatch Create product
          const newProduct= { name, price, image: downloadURL, category, model, speed, type, year, engine, oldNew, countInStock, description};
          dispatch(
            createProduct(newProduct));
          
        });
      }
    );
  };
 };
  function handleFile(e){
    setFile(e.target.files[0])
  }
  return (
    <div className="productMain__container">
        <div className="productMain__header">
        <Link to='/productlist'>
            <button type="button" className="btn"> Go back</button>
        </Link> 
          <h1 className="productMain__title">Create Product </h1>
        </div>
      <div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        <div className="productMain__body">
            <div className="product__body-container">
      <div className="product__content">
        {error123 ? <MessageBox variant="danger">"You must upload a product image"</MessageBox>:""}
       
        <form  className="product__form" action="#">
          <div className="product__top-details">
            <div className="input-box">
              <span className="details">Product Image</span>
              {file ? (
              <img style={{width:200, height:150}}id="image" alt="" src={URL.createObjectURL(file)} 
              />) : (
                <img style={{width:200, height:150}}id="image" alt="" src="/image/carvector2.png" 
                />)}
              <input type="file" id="imagefile"accept="image/*" style={{display:"none"}}
                onChange={handleFile} />
                <label htmlFor="imagefile" onChange={handleFile}className="upload-icon">
                  <i className="fa fa-upload"></i>
                </label>
            </div>
            <div className="input-box">
              <span className="details">Product Description</span>
              <textarea id="description" rows="4"  type="text" 
              placeholder="Enter full detail description of product" 
              onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>
            <div className="input-box">
              <span className="details">Product Name</span>
              <input id="name"type="text" placeholder="Enter product name" 
                onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Price</span>
              <input type="number" id="price" placeholder="Enter price"
               onChange={(e) => setPrice(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Category</span>
              <input id="category" type="text" placeholder="Enter category" 
              onChange={(e) => setCategory(e.target.value)} required/>
            </div>
            
            <div className="input-box">
              <span className="details">Model</span>
              <input id="model" type="text" placeholder="Enter model" onChange={(e) => setModel(e.target.value)} required/>
            </div>
            <div className="input-box">
              <span className="details">Speed</span>
              <input id="speed" type="text" placeholder="Speed of product" onChange={(e) => setSpeed(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Engine Type</span>
              <input id="engine" type="text" placeholder="Diesel/ Petrol engine" onChange={(e) => setEngine(e.target.value)} />
            </div>
            <div className="input-box">
              <span className="details">Year</span>
              <input id="year" type="number" placeholder="Year of Product Manufacture" onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="input-box">
              <span className="details">Count in Stock</span>
              <input id="countInStock" type="number" placeholder="How many do you have instock" onChange={(e) => setCountInStock(e.target.value)}/>
            </div>
          </div>
          <div className="product__bottom-details">
          <div className="radio-details1">
            <input type="radio" name="automatic" id="dot-1" value="Automatic" onChange={(e) => setType(e.target.value)}/>
            <input type="radio" name="manual" id="dot-2" value="Manual" onChange={(e) => setType(e.target.value)}/>
            <input type="radio" name="notsure" id="dot-3" value="Not Sure" onChange={(e) => setType(e.target.value)}/>
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
            <input type="radio" name="new" id="dot-4" value="Brand New" onChange={(e) => setOldNew(e.target.value)}/>
            <input type="radio" name="fairly used" id="dot-5" value="Fairly Used" onChange={(e) => setOldNew(e.target.value)}/>
            <input type="radio" name="not sure" id="dot-6" value="Not sure" onChange={(e) => setOldNew(e.target.value)}/>
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
              <button className="btn" type="submit" onClick={submitHandler}>  Create </button>
          </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
        </form>
      </div>
    </div>
          </div>
       
      </div>
    </div>
  );
}