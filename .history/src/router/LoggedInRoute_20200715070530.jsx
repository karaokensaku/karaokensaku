import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../store/AuthService'


const LoggedInRoute = ({ component: Component, ...rest }) => {  //下でJSXで使用するため最初の文字を大文字にする（中身はLoggedMainPage）、　残りのpropsを...restで受け取る ＊残りとは何なのか...????＊

    const user = useContext(AuthContext)                        //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る

    return (
        <Route
                                                                
            {...rest}                                           //残りのpropsを...restでRouteコンポーネントに与える　　＊何のために？？propsとして渡している？＊
            render={props =>　                                  //Routeのrenderプロパティーを使用することでhistory等のデフォルトpropsを使える
                if(user){

                       
                    console.log(props),
                    <Component {...props} />                    //ログインしてuserに情報が入っているならComponent(LoggedMainPage)にデフォルトのpropsを展開
            }
            }
        />
    )
}

export default LoggedInRoute