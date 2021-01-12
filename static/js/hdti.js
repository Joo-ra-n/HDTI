const cube = document.querySelector('.cube');
const questionsArray = {{ questions|tojson }};

for (let i=0; i<10; i++) {
    const face = document.createElement('div');
    face.innerText = questionsArray[i]; 
    face.classList.add('cube__face');
    cube.appendChild(face)
}

const faces = document.querySelectorAll('.cube__face');
const haedalTalk = document.querySelector('#haedalTalk');
const answersInput = document.querySelector('#answersInput');
const btns = document.querySelector('.btns');
const haedalBtn = document.querySelector('.haedal-btn');
const chargerBox = document.querySelector('.charger-wrap');

let indices = [];
let indice = 0;
let indices_idx = 0;
let clickCnt = 0;
let answers = [];

const haedalTalks = ['누르면 아파!', '해달이는 귀여워', '오늘 점심은 마라탕 어떠세요'];
const questions = questionsArray.slice(10);
let questions_idx = 0;

function setBlur() {
    const hdtiBg = document.querySelector('.hdti-bg');
    // const haedalTalkBubble = document.querySelector('.haedal-talk__bubble');
    const tutorial = document.createElement('div');
    tutorial.classList.add('tutorial');
    faces[0].classList.add('text-blur');
    faces[1].classList.add('text-blur');
    faces[2].classList.add('text-blur');
    faces[8].classList.add('text-blur');
    faces[9].classList.add('text-blur');
    hdtiBg.appendChild(tutorial);
};

function removeBlur() {
    const tutorial = document.querySelector('.tutorial');
    tutorial.classList.remove('tutorial');
    faces[0].classList.remove('text-blur');
    faces[1].classList.remove('text-blur');
    faces[2].classList.remove('text-blur');
    faces[8].classList.remove('text-blur');
    faces[9].classList.remove('text-blur');
};

function rotateFace() {
    for(let i=0; i < faces.length; i++){
        indices[i] += 36;
        faces[i].style.transform = 'rotateX(' + indices[i] + 'deg) translateZ(140px)';
        faces[i].style.transition = '1s';
        faces[i].style.transitionTimingFunction = 'ease';
        faces[i].style.delay = '0s';
    } 
    
    // next indices_idx값
    indices_idx = indices_idx-1 < 0 ? 9 : indices_idx-1
    
    // 한 칸 넘어갔을 때 styling
    let first = indices_idx-2 < 0 ? indices_idx-2 + 10 : indices_idx-2;
    let second = indices_idx-1 < 0 ? indices_idx-1 + 10 : indices_idx-1;
    let fourth = indices_idx-9 < 0 ? indices_idx-9 + 10 : indices_idx-9;
    let fifth = indices_idx-8 < 0 ? indices_idx-8 + 10 : indices_idx-8;
    
    // 1, 5번
    faces[first].style.background = 'rgba(255, 255, 255, 0.17)';
    faces[first].style.color = 'rgba(255, 255, 255, 0.33)';
    
    faces[fifth].style.background = 'rgba(255, 255, 255, 0.17)';
    faces[fifth].style.color = 'rgba(255, 255, 255, 0.33)';
    
    // 2, 4번
    faces[second].style.background = 'rgba(255, 255, 255, 0.23)';
    faces[second].style.color = 'rgba(255, 255, 255, 0.33)';
    
    faces[fourth].style.background = 'rgba(255, 255, 255, 0.23)';
    faces[fourth].style.color = 'rgba(255, 255, 255, 0.33)';
    
    // 3번
    faces[indices_idx].style.background = 'rgba(255, 255, 255, 0.3)';
    faces[indices_idx].style.color = '#fff';
}

for (let i = 0; i < 10; i++) {
    indices.push(indice);
    indice += 36;
}

for (let i = 0; i < 10; i++) {
    faces[i].style.transform = 'rotateX(' + indices[i] + 'deg) translateZ(140px)';
    //3번
    faces[0].style.background = 'rgba(255, 255, 255, 0.3)';
    faces[0].style.color = '#fff';

    //2, 4번
    faces[9].style.background = 'rgba(255, 255, 255, 0.23)';
    faces[1].style.background = 'rgba(255, 255, 255, 0.23)';

    //1, 5번
    faces[8].style.background = 'rgba(255, 255, 255, 0.17)';
    faces[2].style.background = 'rgba(255, 255, 255, 0.17)';
}

// 튜토리얼 배경
setBlur();

// 튜토리얼
haedalTalk.innerHTML = `<p class="haedal-talk__tutorial">1번: 매우 그렇다.</p>
                        <p class="haedal-talk__tutorial">2번: 조금 그렇다.</p>
                        <p class="haedal-talk__tutorial">3번: 조금 아니다.</p>
                        <p class="haedal-talk__tutorial">4번: 매우 아니다.</p>`        
haedalTalk.style.display = 'flex';
haedalTalk.style.flexDirection = 'column';
haedalTalk.style.justifyContent = 'center';
haedalTalk.style.alignItems = 'center';

console.log('questionsArray',questionsArray)

setTimeout(() => {
    // 블러 없애기
    removeBlur();
    // 튜토리얼 없애기
    haedalTalk.style.display = 'none';
    // 핑그르르르
    for(let i=0; i < faces.length; i++){
        indices[i] = indices[i] + 360 * 4;
        faces[i].style.transform = 'rotateX(' + indices[i] + 'deg) translateZ(140px)';
        faces[i].style.transition = '1.3s';
        faces[i].style.transitionTimingFunction = 'ease-in-out';
        faces[i].style.delay = '.2s';
    } 
    // 버튼 이벤트리스너
    btns.addEventListener('click', function(e) {
        if (e.target.id == 'haedalCharacter') {
            // 검사 항목 제출
            if(clickCnt > 28) {
                haedalTalk.style.display = 'none';
                answersInput.value = answers;
            } else {
                e.preventDefault();
                let randomIdx = Math.floor(Math.random() * (haedalTalks.length));
                haedalTalk.innerHTML = `<p>${haedalTalks[randomIdx]}</p>` 
                
                haedalTalk.style.display = 'flex';
                haedalTalk.style.justifyContent = 'center';
                haedalTalk.style.alignItems = 'center';
            }
        } else {
            //해달이 말풍선 없애기
            haedalTalk.style.display = 'none';

            clickCnt += 1;

            if(clickCnt > 28) {
                haedalTalk.innerHTML = `<p class="haedal-talk__tutorial">저를 눌러주세요!</p>`        
                haedalTalk.style.display = 'flex';
                haedalTalk.style.flexDirection = 'column';
                haedalTalk.style.justifyContent = 'center';
                haedalTalk.style.alignItems = 'center';
            } else {
                // 문항 수 표시하기
                const charger = document.createElement('span');
                charger.classList.add('charger');
                chargerBox.appendChild(charger);

                answers.push(e.target.id);
                // 질문지 회전시키기                    
                rotateFace();

                // 한 바퀴 돌고난 후 질문 바꾸기
                if (clickCnt > 7 && questions.length) {
                    faces[questions_idx].innerText = questions.shift();
                    questions_idx = questions_idx-1 < 0 ? 9 : questions_idx-1;
                }
            }
        }
    });
}, 3000);