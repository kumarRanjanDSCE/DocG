function switchbook1(){
    let start_box1 = document.querySelector('#first');
    let start_box2=document.querySelector('#second');
    let ambu_first=document.querySelector('#ambu-title');
    let ambu_second=document.querySelector('#ambu-img');
    let ambu_third=document.querySelector('#ambu-submit');
    start_box1.style.backgroundColor="rgb(255, 241, 245)";
    start_box1.style.color="red";
    ambu_third.innerHTML='SEARCH AMBULANCE';
    ambu_first.innerHTML='Book an Ambulance';
    ambu_second.style.width='10rem'; 
    ambu_second.style.height='5rem'; 
    ambu_second.src='../img/ambu.png';
    start_box2.style.backgroundColor="rgb(222, 0, 0)";
    start_box2.style.color="white";
  }
  function switchbook2(){
    let start_box1 = document.querySelector('#first');
    let start_box2=document.querySelector('#second');
    let ambu_first=document.querySelector('#ambu-title');
    let ambu_second=document.querySelector('#ambu-img');
    let ambu_third=document.querySelector('#ambu-submit');
    start_box2.style.backgroundColor="rgb(255, 241, 245)";
    start_box2.style.color="red";
    ambu_first.innerHTML='Request/Donate Blood';
    ambu_third.innerHTML='REQUEST BLOOD';
    ambu_second.src='../img/blood.png';
    ambu_second.style.width='4rem'; 
    ambu_second.style.height='5rem'; 
    start_box1.style.backgroundColor="rgb(222, 0, 0)";
    start_box1.style.color="white";
  }
  