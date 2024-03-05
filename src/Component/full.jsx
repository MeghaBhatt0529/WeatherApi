// import React, { useState, useEffect } from "react";
// import ProductData from "./ProductData";
// import ProductInput from "./ProductInput";
// import DeletePopUp from "./DeletePopUp";
// import { getLocalStorage, setLocalStorage } from "./Service";

// function Product() {
//   //State
//   const [productForm, setProductForm] = useState({
//     product: "",
//     price: "",
//     description: "",
//   });

//   const [productList, setProductList] = useState([]);
//   const [productEdit, setProductEdit] = useState(null);
//   const [errors, setErrors] = useState([]);
//   const [popUp, setPopUp] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(2);
//   const [searchItem, setSearchItem] = useState("");

//   console.log(errors);

//   // local storage
//   // useEffect(() => {
//   //   const storedProductList = getLocalStorage;
//   //   setProductList(storedProductList);
//   // }, []);

//   //LS new
//   useEffect(() => {
//     getLocalStorage()
//       .then((storedProductList) => {
//         setProductList(storedProductList);
//       })
//       .catch((error) => {
//         console.error("Error fetching from local storage:", error);
//       });
//   }, []);

//   //handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     //auto change first alphabet into UpperCase
//     const formatAlphabet =
//       name === "product" || name === "description"
//         ? value.charAt(0).toUpperCase() + value.slice(1)
//         : value;
//     setProductForm({ ...productForm, [name]: formatAlphabet });

//     setErrors({ ...errors, [name]: "" }); // reset errors
//   };

//   // Button Submit

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     const { product, price, description } = productForm;
//     const newErrors = {};

//     // Validation conditions
//     if (product === "" || !/^[a-zA-Z ]+$/.test(product)) {
//       newErrors.product = "Enter product name (alphabets only)";
//     }

//     if (price === "" || price < 10 || price > 999) {
//       newErrors.price = "Enter valid price between 10-999";
//     }

//     if (description === "" || description.length > 50) {
//       newErrors.description = "Enter product description, Max:50 Char.";
//     }

//     // Display all errors
//     setErrors(newErrors);

//     // If errors, return without submitting
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }
//     // Validation end

//     //Unique ID
//     const d = new Date();
//     const uid = d.getTime();
//     const newProduct = { uid, ...productForm };

//     // Update

//     //   /// for dual entry new
//     function uniqueProductName(productForm, isNewEntry) {
//       const isNameMatched = productList.findIndex(
//         (ele) => ele.product === productForm.product
//       );

//       if (isNameMatched >= 0 && isNewEntry) {
//         setErrors({
//           ...errors,
//           product: "Product already entered in records",
//         });
//         return true;
//       }

//       //name should not match with records
//       if (
//         isNameMatched >= 0 &&
//         productEdit !== null &&
//         productList[isNameMatched].uid !== productEdit
//       ) {
//         setErrors({
//           ...errors,
//           product: "Product already entered in records",
//         });
//         return true;
//       }
//       return false;
//     }
//     // update condition
//     if (productEdit) {
//       const updateProductList = productList.map((item) =>
//         item.uid === productEdit ? { uid: productEdit, ...productForm } : item
//       );

//       if (uniqueProductName(productForm, false)) {
//         return;
//       }

//       setProductList(updateProductList);
//       setLocalStorage(updateProductList);
//       setProductEdit(null);
//     } else {
//       if (uniqueProductName(productForm, true)) {
//         return;
//       }
//       setProductList([newProduct, ...productList]);

//       // Setlocal storage
//       setLocalStorage([newProduct, ...productList]);
//     }
    

//     //Reset Input
//     setProductForm({
//       product: "",
//       price: "",
//       description: "",
//     });
//   };

//   // Edit to form- general

//   const handleEdit = (uid) => {
//     const productToEdit = productList.find((item) => item.uid === uid);
//     setProductForm({ ...productForm, ...productToEdit });
//     setProductEdit(uid);
//   };

//   // Delete
//   const handleDelete = (uid) => {
//     console.log(uid);
//     const updatedProductList = productList.filter((item) => item.uid !== uid);
//     setProductList(updatedProductList);
//     setLocalStorage(updatedProductList);
//   };

//   const confirmDelete = (uid) => {
//     setPopUp(uid);
//   };

//   const cancelDelete = () => {
//     setPopUp(null);
//   };

//   const handleConfirmDelete = () => {
//     handleDelete(popUp);
//     setPopUp(null);
//   };

//   //handle search
//   const handleSearch = () => {
//     const storedProductlist = getLocalStorage();

//     if (searchItem.trim() === "") {
//       // If the search term is empty, reset to the overall list
//       setProductList([...storedProductlist]);
//     } else {
//       // Filter the overall list based on the entered name
//       const filteredList = storedProductlist.filter((item) =>
//         item.product.toLowerCase().includes(searchItem.toLowerCase())
//       );

//       setProductList([...filteredList]);
//     }
//   };
//   return (
//     <div>
//       <h4 style={{ color: "green" }}>Product Input: </h4>
//       <ProductInput
//         productForm={productForm}
//         onInputChange={handleInputChange}
//         onSubmit={handleSubmit}
//         errors={errors}
//         setSearchItem={setSearchItem}
//         handleSearch={handleSearch}
//       />
//       <h4 style={{ color: "green" }}>Product Detail:</h4>
//       <ProductData
//         productList={productList}
//         handleEdit={handleEdit}
//         confirmDelete={confirmDelete}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         itemsPerPage={itemsPerPage}
//       />
//       {popUp && (
//         <DeletePopUp
//           handleConfirmDelete={handleConfirmDelete}
//           cancelDelete={cancelDelete}
//         />
//       )}{" "}
//     </div>
//   );
// }

// export default Product;

// import React from "react";

// function ProductData({
//   productList,
//   handleEdit,
//   confirmDelete,
//   itemsPerPage,
//   currentPage,
//   setCurrentPage,
// }) {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = productList.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div className="table">
//         <table>
//           <thead>
//             <tr>
//               <th>UID</th>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((item) => (
//               <tr key={item.uid}>
//                 <td>{item.uid}</td>
//                 <td>{item.product}</td>
//                 <td>{item.price}</td>
//                 <td>{item.description}</td>
//                 <td>
//                   <button onClick={() => handleEdit(item.uid)}
//                   className="edit">
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => confirmDelete(item.uid)}
//                     className="delete"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}

//       <div className="pagination">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         <p>{currentPage}</p>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={endIndex >= productList.length}
//         >
//           Next
//         </button>
//       </div>
//       <hr />
//     </div>
//   );
// }

// export default ProductData;
// import React from "react";

// function ProductInput({
//   productForm,
//   onInputChange,
//   onSubmit,
//   errors,
//   setSearchItem,
//   handleSearch,
// }) {
//   return (
//     <div className="form">
//       {/* Search Box */}

//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           placeholder="Search..."
//           className="searchBar"
//           onChange={(e) => setSearchItem(e.target.value)}
//         />
//         <button type="submit" onClick={handleSearch} className="searchBtn">
//           Search
//         </button>
//       </div>

//       <form onSubmit={onSubmit}>
//         <div>
//           <label>Product Name*</label>
//           <input
//             type="text"
//             name="product"
//             value={productForm.product}
//             onChange={onInputChange}
//           />
//           {errors.product && <p className="error">{errors.product}</p>}
//         </div>

//         <div>
//           <label>Price in Rs.* </label>
//           <input
//             type="number"
//             name="price"
//             value={productForm.price}
//             onChange={onInputChange}
//           />
//           {errors.price && <p className="error">{errors.price}</p>}
//         </div>

//         <div>
//           <label>Description of product*</label>
//           <textarea
//             name="description"
//             maxLength={50}
//             value={productForm.description}
//             onChange={onInputChange}
//           />
//           <div style={{ color: "grey", fontSize: "10px" }}>
//             Characters : {productForm.description.length} // 50
//           </div>
//           {errors.description && <p className="error">{errors.description}</p>}
//         </div>

//         <button type="submit" className="button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProductInput;

// import React from "react";

// function DeletePopUp({ cancelDelete, handleConfirmDelete }) {
//   return (
//     <>
//       <div className="deletePopup">
//         <p>Are you sure to delete- Product details?</p>
//         <button onClick={cancelDelete} className="popUp1">
//           Cancel
//         </button>
//         <button onClick={handleConfirmDelete} className="popUp2">
//           Confirm
//         </button>
//       </div>
//       <div className="overlay"></div>
//     </>
//   );
// }

// export default DeletePopUp;

// export const getLocalStorage = () => {
//     return new Promise((resolve, reject) => {
//       try {
//         const storedProductList = JSON.parse(localStorage.getItem("productList")) || [];
//         resolve(storedProductList);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };
  
//   export const setLocalStorage = (data) => {
//     return new Promise((resolve, reject) => {
//       try {
//         localStorage.setItem("productList", JSON.stringify(data));
//         resolve("Local storage updated successfully");
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };


/* body {
  height: 100vh;
  margin: 0;
  justify-content: center;
  display: flex;
}

.form {
  width: 450x;
  border: 1px solid green;
  padding: 10px;
  border-radius: 4px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: green;
}

input,
textarea,
button {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid green;
  border-radius: 4px;
}

.table {
  border: 1px solid green;
}

.table th {
  background-color: green;
  color: white;
}
.table th,
.table td {
  border: 1px solid green;
  padding: 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
}

.button {
  background-color: green;
  color: white;
}

.edit {
  background-color: green;
  color: #ffffff;
  width: 50px;
  padding: 2px;
  margin-top: 3px;
}
.delete {
  background-color: #ff0000;
  color: white;
  width: 60px;
  padding: 2px;
  margin-left: 2px;
  margin-top: 3px;
}
.error {
  color: #ff0000;
  margin-top: 3px;
  margin-bottom: 4px;
  font-size: 12px;
}

.popUp1,
.popUp2 {
  width: 100px;
  border-radius: 0%;
  margin: 0 0 0 9%;
  border-radius: 5px;
  color: #ffffff;
  padding: 3px;
}

.popUp1 {
  background-color: rgb(19, 121, 19);
}
.popUp2 {
  background-color: #ff0000;
}

@media screen and (max-width: 768px) {
  .form {
    width: 100%;
  }
  .table {
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .form {
    width: 80%;
  }

  .table {
    width: 80%;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.deletePopup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50%;
  background-color: #f3f3f3;
  padding: 3rem 4rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.5s;
  border: grey;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  color: blue;
  width: 60px;
  height: 30px;
  padding: 2px;
  margin-left: 2px;
  cursor: pointer;
  border-color: antiquewhite;
}

.search-container {
  float: right;
  display: flex;
}
.searchBar {
  width: 60%;
  border-radius: 0%;
  height: 20px;
  margin-left: 20%;
}
.searchBtn {
  width: 20%;
  border-radius: 0%;
  float: inline-end;
  height: 20px;
  background-color: green;
  color: #f3f3f3;
  font-size: xx-small;
  padding: 3px;
} */

  
  
  




