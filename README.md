
데모
------------------------

https://judeyong.github.io/react-netflix/

------------------------

<br/>
인프런의 따라 하며 배우는 리액트 A-Z 강의를 보며 진행하였습니다.
<br/>

### Create React App으로 리액트 설치.

프론트엔드 분야는 많은 기술이 빠르게 나타나면서 초기 세팅에 많은 번거로움이 생긴 걸로 알고 있습니다.
CRA를 통해 리액트를 설치하면 Webpack, Babel 등의 기술이 이미 설정되어 있기 때문에 많은 시간이 걸리지 않고 프로젝트를 시작할 수 있습니다.
<br/>Nodejs 가 설치되어 있는 컴퓨터 환경에서 터미널에 명령어를 통해 리액트를 설치하여 CRA 초기 세팅을 하였습니다.


    npx create-react-app ./ 
    


### 영화DB API key 이용하여 영화DB 받아오기, (axios 사용)
https://www.themoviedb.org에 가입한 후 제공되는 API key를 이용해 요청을 보낸 후 DB를 정보를 받습니다.<br/>
위 사이트에서 API를 통해 제공받을 수 있는 다양한 정보의 요청 사용법은 APIdocs에서 알려줍니다.
<br/>이를 통해 필요에 맞에 사용할 수 있습니다.


### CSS, styledComponent 사용.
<br/>기본적인 css와 styled-components를 사용했습니다.
<br/>css는 파일로 따로 분리하여 사용 하였고 styled-components는 하단 부분에 정의하였습니다.


### 리액트 라우터 설정.

    const Layout = () => {
        return(
            <div>
                <Nav/>

                <Outlet/>

                <Footer/>
            </div>
        );
    }
    
    function App() {
      return (
        <div className="App">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path=':movieId' element={<DetailPage />} />
              <Route path='Search' element={<SearchPage />} />
            </Route>
          </Routes>
        </div>
      )
    }

화면 구성에서 nav와 footer 부분은 항상 고정되어 있습니다.
<br/>이 두 개의 컴포넌트들은 리액트 라우터를 통해 어느 페이지에서나 보이게 고정되어 있습니다.
<br/>리액트 라우터의 아웃렛(Outlet)을 통해 접속 경로에 따라 컴포넌트를 렌더해 줍니다.
<br/>nav 밑으로는 banner 컴포넌트가 존재합니다. 20개씩 제공받는 영화 중에 랜덤하게 영화를 한 가지 뽑아서 banner에서 보여줍니다.
<br/>그 밑은 row 컴포넌트가 가로 방향으로 영화들을 나열합니다. 클릭 시 상세보기가 modal 형태로 나타납니다. 그 밑은 footer가 존재합니다.

### Custom hooks
------------
## useDebounce

navbar에 위치한 검색창에 검색을 하면 검색 결과가 화면에 나타나게 됩니다.
<br/>input의 글자를 입력할 때마다 setState에 글자가 추가되며 이는 곧 렌더가 다시 일어나는 상황을 만듭니다.
<br/>리렌링이 자주 발생하는 것은 성능 저하를 만들고 백엔드에서 불필요한 로드가 생깁니다.
<br/>리액트는 렌더가 연속적으로 일어나면 이를 하나로 묶어서 처리하는 것을 지원합니다.
<br/>비동기 처리와 Custom hooks에 익숙해지기 위해 만들었습니다. 이 과정에서 state가 바뀜에 따라 렌더링이 일어나는 리액트를 이해하는 시간이었습니다.
<br/>useDebounce hooks는 불필요한 렌더를 줄이기 위해 입력이 멈추기 전까지 계속 입력을 받고 입력이 멈췄을 때 state를 한 번에 업데이트합니다.

    import { useState, useEffect } from "react";

    export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() =>{
            setDebounceValue(value);
            }, delay);

            return () => {
                clearTimeout(handler)
            };
        }, [value, delay]);

        return debounceValue;
    }

## useOnClickOutside

    import { useEffect } from 'react'

    export default function useOnClickOutside( ref, handler) {
    useEffect( () =>{
        const listener = (event) => {
        console.log('ref', ref.current);
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
        }, [])
    }
    
useOnClickOutside hooks는 2개의 인자를 받습니다.
<br/>첫 번째 인자는 ref입니다. ref에 연결된 것은 modal 창입니다.
<br/>ref.current를 활용해 modal 창의 안팎 클릭 여부를 판단합니다.
<br/>handler는 callback 함수로 setModalOpen을 넘겨받습니다.
<br/>true 상태이면 modal 창이 열린 것이고 false로 바꿔준다면 modal 창이 닫히게 됩니다.

--------------------
### 상세보기 (Modal) 구현
<br/>Row.js의 modalOpen state를 만들어 false 값으로 초기화해줍니다.
<br/>modalOpen state의 역할은 row의 아이템을 클릭 시 modal 창을 띄우고 닫기 위해 사용합니다.
<br/>movieModal 컴포넌트에 props로 클릭한 movie 정보를 넘겨줍니다.

    {modalOpen && (<MovieModal {...movieSelected} setModalOpen={setModalOpen}/>)}

    <div className='presentation'>
        <div className='wrapper-modal'>
            <div className='modal' ref={ref}>
                <span onClick={() => setModalOpen(false)} className='modal-close'>
                    x
                </span>
                
                <img
                    className='modal__poster-img'
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt='modal__poster-img'
                />

                <div className='modal__content'>
                    <p className='modal__details'>
                        <span className='modal__user_perc'>
                            100% for you!
                        </span>
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className='modal__title'>{title ? title : name}</h2>
                    <p className='modal__overview'>평점은: {vote_average}</p>
                    <p className='modal__overview'>{overview}</p>
                </div>
            </div>
        </div>
    </div>


### 어려웠던 부분.
# 제공되는 데이터의 정확성
<br/>화면에 가장 큰 부분을 차지하는 banner 부분의 정보들이 정확하지 않습니다.
<br/>응답받은 정보에서 필요한 정보가 존재하는 경우에는 문제가 없지만 존재하지 않는 경우에는 기능이 작동하지 않습니다.
<br/>프로젝트 내부의 문제는 아니기 때문에 당장 수정할 수는 없지만 공식 홈페이지에서 제공해 주는 API docs를 더 자세히 읽어 보면서 지금보다 나은 방법이 있는지 찾아보아야 합니다.
 
# 리액트의 버전 충돌시
<br/>리액트 18 버전에서 지원이 원활하지 않은 라이브러리가 간혹 존재합니다. ex) react-beautiful-dnd
<br/>실행이 되더라도 warnning 표시가 나옵니다.
<br/>혹은 <StrictMode> 부분을 지워서 임시적으로 해결할 수 있습니다.
<br/><StrictMode>는 React에서 애플리케이션의 잠재적인 문제를 알아내기 위해 기본적으로 제공되는 도구입니다.
<br/>공식 홈페이지에서는 <StrictMode> 사용을 권장합니다.


# 추가해 볼 만한 것.
<br/>사이트에 접속 시 데이터를 요청하고 응답을 받기까지 조금의 로딩이 존재합니다.
<br/>이 때문에 화면이 제대로 그려지지 않습니다. 프로그레스 바 나 로딩 스피너를 만들어 로딩 상태 표시가 필요합니다.
<br/>react-progress-bar를 이용하는 방법을 생각해 보았습니다. 혹은 bootstrap spinner를 사용 할 수도 있습니다.
