import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import DashBoard from "./components/DashBoard"
import MoneyTransfer from "./components/MoneyTransfer"
import Paymentssuccess from "./components/Paymentssuccess"
import AllTransactions from "./components/AllTransactions"
import Home from "./components/Home"
function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
       <Route path="/moneytransfer" element={<MoneyTransfer />}/>
       <Route path="/paymentsuccess" element={<Paymentssuccess/>}></Route>
       <Route path="/alltransactions" element={<AllTransactions/>} ></Route>
       
    </Routes>
   </BrowserRouter>
  
  
    </>
  )
}

export default App
