const el = document.querySelector('.form');
function Hide() {
    let form = document.getElementsByClassName('login');
    let regis = document.getElementsByClassName('register');
    if (form[0].style.display != 'block') {
        form[0].style.display = 'block';
        regis[0].style.display = 'none';
    }
    else {
        form[0].style.display = 'none';
        regis[0].style.display = 'block';
    }
}
function toggleHide() {
    let form = document.getElementsByClassName('login');
    let regis = document.getElementsByClassName('register');
    if (el.style.display = 'none') {
        regis[0].style.display = 'none';
        form[0].style.display = 'block';
        el.style.display = 'flex';
    }
    else {
        regis[0].style.display = 'none';
        form[0].style.display = 'none';
        el.style.display = 'none';
    }

    clearTimeout(time);
}
function closing() {
    let form = document.getElementsByClassName('login');
    let regis = document.getElementsByClassName('register');
    form[0].style.display = 'none';
    regis[0].style.display = 'none';
    el.style.display = 'none';
}

let time = setTimeout(toggleHide, 2000);
console.log(time);

function flip1() {
    let pat = document.getElementById('patient');
    let user = document.getElementsByClassName('user');
    user[0].style.background = 'linear-gradient(to right, rgb(228, 113, 32) 0%, rgb(228, 113, 32) 50%,rgb(255, 255, 255) 50%, rgb(255, 255, 255) 100%)';
    user[1].style.background = 'linear-gradient(to right, rgb(228, 113, 32) 0%, rgb(228, 113, 32) 50%,rgb(255, 255, 255) 50%, rgb(255, 255, 255) 100%)';


}
function flip2() {
    let doc = document.getElementById('doctor');
    let user = document.getElementsByClassName('user');
    user[0].style.background = 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(225, 255, 255) 50%,rgb(228, 113, 32) 50%, rgb(228, 113, 32) 100%)';
    user[1].style.background = 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(225, 255, 255) 50%,rgb(228, 113, 32) 50%, rgb(228, 113, 32) 100%)';
}



//login form
const form1 = document.getElementById('login')
form1.addEventListener('submit', login)

async function login(event) {
    event.preventDefault()
    const userName = document.getElementById('userNamel').value
    const password = document.getElementById('passwordl').value

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        const sign = document.getElementById('sign');
        const profile = document.getElementById('profile');
        sign.style.display = "none";
        profile.style.display = "block";
        el.style.display = 'none';
        
    } else {
        alert(result.error)
    }
}

//registeration
const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const userName = document.getElementById('userName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const Cpassword = document.getElementById('confirm_password').value

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
            email,
            password,
            Cpassword
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        alert('Success')
    } else {
        alert(result.error)
    }
}

const form10= document.getElementById('subBhai')
form10.addEventListener('submit',healthtips)

async function healthtips(event) {
    event.preventDefault()
    const email = document.getElementById('newnew').value

    const result = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    }).then((res) => res.json())
    if (result.status === 'ok') {
        alert('Success')
    } else {
        alert(result.error)
    }
}


function profileHide() {
    let reg = document.getElementById('profileBox');
    if (reg.style.display != 'flex') {
        reg.style.display = 'flex';
        reg.style.opacity = "1";
        reg.style.animation ="reveal 0.2s forwards";
    }
    else{
        reg.style.opacity = "0";
        setTimeout(function () { reg.style.display = "none"; }, 600);
    }
  }