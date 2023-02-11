
데모
------------------------

https://judeyong.github.io/react-netflix/

------------------------
### Create React App으로 리액트 설치.

프론트엔드 분야는 많은 기술이 빠르게 나타나면서 초기 세팅에 많은 번거로움이 생긴 걸로 알고 있습니다.
CRA를 통해 리액트를 설치하면 Webpack, Babel 등의 기술이 이미 설정되어 있기 때문에 많은 시간이 걸리지 않고 프로젝트를 시작할 수 있습니다.
<br/>Nodejs 가 설치되어 있는 컴퓨터 환경에서 터미널에 명령어를 통해 리액트를 설치하여 CRA 초기 세팅을 하였습니다.


    npx create-react-app ./ 
    


### 영화DB API key 이용하여 영화DB 받아오기, (axios 사용)
https://www.themoviedb.org에 가입한 후 제공되는 API key를 이용해 요청을 보낸 후 DB를 정보를 받습니다.<br/>
위 사이트에서 API를 통해 제공받을 수 있는 다양한 정보의 요청 사용법은 APIdocs에서 알려줍니다. 이를 통해 필요에 맞에 사용할 수 있습니다.


### CSS, styledComponent 사용.


### 리액트 라우터 설정.

    const Layout = () => {
    return(
        <div>
        <Nav/>

      <Outlet/>

      <Footer/>
    </div>
    );
    };
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
상세보기 (Modal) 구현

### 문제점과 해결 남은 개선사항들.
 
제공되는 데이터의 정확성.
 
리액트의 버전 충돌 문제.
