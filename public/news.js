var slideIndex=0;
displayNews(slideIndex);
function nextSlide(n) {
    if(slideIndex<0){
      slideIndex=slideIndex+20;
    }
    else if(slideIndex>=20){
      slideIndex=slideIndex-20;
    }
    displayNews(slideIndex += 7*n);
  }
  async function displayNews(n){
    topFunction()
    let newsBox=document.getElementsByClassName("box1");
    let newsImg=document.getElementsByClassName("NewsImg");
    let newsHeader=document.getElementsByClassName("newsHeader");
    let newsDesc=document.getElementsByClassName("newsDesc");
    let newsUrl=document.getElementsByClassName("newsUrl");
    url='https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=6c4c092046de4ab8b32c97d5994919ba';
    const result=await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for(var i=0;i<7;i++){
        if(n+i<0){
          n=20+n;
        }
        else if(n+i<20){
        }
        else{
          n=n-20;
        }
        data.articles[n+i].urlToImage===null?newsImg[i].src="../img/unavailable.png":newsImg[i].src=`${data.articles[n+i].urlToImage}`;
        data.articles[n+i].title===null?newsHeader[i].innerHTML="not availavle":newsHeader[i].innerHTML=`${data.articles[n+i].title}`;
        data.articles[n+i].url===null?newsUrl[i].href="#":newsUrl[i].href=`${data.articles[n+i].url}`;
        data.articles[n+i].description===null?newsDesc[i].innerHTML="not availavle":newsDesc[i].innerHTML=`${data.articles[n+i].title}`;
        console.log(n+i);
      }
    });
  
  }

const mybutton = document.querySelector('.scroller');
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
