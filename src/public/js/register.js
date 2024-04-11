const form = document.getElementById('registerForm');

form.addEventListener('submit',event=>{
    event.preventDefault();
    const data = new FormData(form);
    const objet = {};
    data.forEach((value,key)=>objet[key]=value);
    //hacer el fetch
    
})