var login=JSON.parse(localStorage.getItem("login"))
var Username=document.querySelector("#userName")
var right=document.querySelector("#right")
var male=document.querySelector("#male")
var female=document.querySelector("#female")
var cartDesign=document.querySelector("#cart")
var x=document.querySelector("#x")
var cartBody=document.querySelector("#cart-body")


x.addEventListener("click",()=>{
    cartDesign.style.right="-100%"
})




if(login)
{
    Username.innerHTML=login.fname
    var btn=document.createElement("button")
    btn.innerHTML="logout"
    right.appendChild(btn)
    btn.addEventListener("click",()=>{
        localStorage.removeitem("login")
    })
}

async function displayProduct(){
    var api=await fetch("https://www.shoppersstack.com/shopping/products/alpha")
    console.log(api)
    var apiJson=await api.json()
    console.log(apiJson);
    var data=apiJson.data
    console.log(data);



var maleData=data.filter((e)=>{
    if(e.category=="men"){
        return e;
    }
  
})





var femaleData=data.filter((e)=>{
    if(e.category=="women"){
        return e;
    }
})




    maleData.map((e)=>{
    male.innerHTML+= `<div class="cont" id="${e.productId}">
                 <img src="${e.productImageURLs[0]}" alt="">
                 <h3>${e.name}</h3>
                 <p>${e.description}</p>
                <div>
                <h4>${e.price}</h4>
                <h5>${e.rating}</h5>
                
                 
              </div>
              <button class="cart-btn">Add to cart</button>
            </div>`


    })
   



    femaleData.map((e)=>{
        female.innerHTML +=`<div class="cont" id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h3>${e.name}</h3>
        <p>${e.description}</p>
       <div>
       <h4>${e.price}</h4>
       <h5>${e.rating}</h5>
       
        
     </div>
     <button class="cart-btn">Add to cart</button>
   </div>`


    })



    var cartbtn=document.querySelectorAll(".cart-btn")
    console.log(cartbtn);
    cartbtn.forEach((e)=>{
        e.addEventListener("click",()=>{
        cartDesign.style.right="0"
     var parent=e.parentElement 
        console.log(parent);
   
        // var pimg=parent.querySelector("img")
        // console.log(pimg);
        // var pTitle=parent.querySelector("h3")
        // console.log(pTitle);
        // var pPrice=parent.querySelector("h4")
        // console.log(pPrice);


        maleData.map((f)=>{
            if(parent.id==f.productId){
               cartBody.innerHTML+=` <div class="cart-body-design">
               <div class="p-img">
                   <img src="${f.productImageURLs[0]}" alt="">
               </div>
               <div class="p-details ">
                   <h3>${f.name}</h3>
                   <h4>${f.price}</h4>
                   <input type="number" value="1" id="">
                  
               </div>
               <div class="p-subtotal">
                   <h2 class="sub">${f.price}</h2>
                   <i class="fa-solid fa-trash"></i>
               </div>
           </div>`
            }

        })
        

        var trash=document.querySelectorAll(".fa-trash")
        console.log(trash);
        trash.forEach((d)=>{
            d.addEventListener("click",()=>{
             d.parentElement.parentElement.remove()

             total()
            })
        
            var input=document.querySelectorAll("input")
            function subtotal(){

                input.forEach((e)=>{
                    e.addEventListener("click",()=>{
                        if(e.value<1){
                            e.value=1
                        }
                        var parent=e.parentElement.parentElement
                        var price=parent.querySelector("h4")
                         var sub=parent.querySelector("h2")
                         sub.innerHTML=e.value*price.innerHTML
                     
                    })
                })

                
            }
            subtotal();
           function total(){

            var stotal=document.querySelectorAll(".sub")
            var Gtotal=document.querySelector("#total")
            var sum=0
            stotal.forEach((e)=>{
                var dummy=parseInt(e.innerHTML)
                sum+=dummy
            })
            Gtotal.innerHTML=`Total:${sum}`
           }
            total()
            })
    })
})
}
    


displayProduct();