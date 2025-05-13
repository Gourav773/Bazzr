// // import React from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Login from './Admin/Login.jsx';
// // import Sidebar from './Admin/Sidebar.jsx';
// // import Dashboard from './Admin/Dashbord.jsx';
// // import User from './Admin/User';
// // import Adduser from './Admin/Adduser.jsx';
// // import Roles from './Admin/Role.jsx';
// // import Category from './Admin/Category';
// // import AddSubCategory from './Admin/Subcategory';
// // import Product from './Admin/Product.jsx';
// // import Offers from './Admin/Offers';
// // import Charts from './Admin/Chart.jsx';
// // import './App.css';

// // function App() {
// //   return (
// //     <BrowserRouter basename="/Bazzr">
// //       <Routes>
// //         {/* Login page */}
// //         <Route path="/login" element={<Login />} />

// //         {/* Layout with Sidebar */}
// //         <Route path="/" element={<Sidebar />}>
// //         <Route path="/login" element={<Login />} />
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="charts" element={<Charts />} />
// //           <Route path="user" element={<User />} />
// //           <Route path="adduser" element={<Adduser />} />
// //           <Route path="role" element={<Roles />} />
// //           <Route path="category" element={<Category />} />
// //           <Route path="addSubCategory" element={<AddSubCategory />} />
// //           <Route path="offers" element={<Offers />} />
// //           <Route path="product" element={<Product />} />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;



// import React from 'react';
// import { HashRouter, Routes, Route } from 'react-router-dom';
// import Login from './Admin/Login';
// import Sidebar from './Admin/Sidebar';
// import Dashboard from './Admin/Dashbord';
// import User from './Admin/User';
// import Adduser from './Admin/Adduser';
// import Roles from './Admin/Role';
// import Category from './Admin/Category';
// import AddSubCategory from './Admin/Subcategory';
// import Product from './Admin/Product';
// import Offers from './Admin/Offers';
// import Charts from './Admin/Chart';
// import './App.css';

// function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<Sidebar />}>
//           <Route path="login" element={<Login />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="charts" element={<Charts />} />
//           <Route path="user" element={<User />} />
//           <Route path="adduser" element={<Adduser />} />
//           <Route path="role" element={<Roles />} />
//           <Route path="category" element={<Category />} />
//           <Route path="addSubCategory" element={<AddSubCategory />} />
//           <Route path="offers" element={<Offers />} />
//           <Route path="product" element={<Product />} />
//         </Route>
//       </Routes>
//     </HashRouter>
//   );
// }

// export default App;


import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './Admin/Login';
import Sidebar from './Admin/Sidebar';
import Dashboard from './Admin/Dashbord';
import User from './Admin/User';
import Adduser from './Admin/Adduser';
import Roles from './Admin/Role';
import Category from './Admin/Category';
import AddSubCategory from './Admin/Subcategory';
import Product from './Admin/Product';
import Offers from './Admin/Offers';
import Charts from './Admin/Chart';
import './App.css';

function App() {
  return (
    <HashRouter>
     <Routes>
   <Route path='/'>
    
     <Route path='/' element={<Sidebar/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/dashboard' element={<Dashboard/>}></Route>
     <Route path='/charts' element={<Charts/>}></Route>
     <Route path='/user' element={<User/>}></Route>
     <Route path='adduser' element={<Adduser/>}></Route>
     <Route path='/role' element={<Roles/>}></Route>
     <Route path='/category' element={<Category/>}></Route>
     <Route path='/addSubCategory' element={<AddSubCategory/>}></Route>
     <Route path='/offers' element={<Offers/>}/>
     <Route path='/product' element={<Product/>}/>
    </Route>
   </Routes>
  
    </HashRouter>
  );
}

export default App;
