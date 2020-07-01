import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#loginmodal')

//ログイン処理を行うモーダル
class LoginModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            IsOpenModal: true,//モーダルが開いているかの情報

        }
    }

    openModal() {
        this.setState({ IsOpenModal: true });

    }

    closeModal() {
        this.setState({ IsOpenModal: false });
    }
    
    render() {


        ////////css///////////css///////////css///////
        const modalContainer = {
            backgroundColor: "blue",
            height: "460px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }

        const modalText = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "white",

            height: "360px",
            width: "400px",
        }

        const customStyles = {//modalのスタイル
            overlay: {//クリックするとモーダルを閉じる部分（画面外）のスタイル
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(200, 200, 200, 0.75)',
            },
            content: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                //真ん中に寄せる
                top: "17%",
                left: "30%",
                right: "30%",
                bottom: "17%",
                //真ん中に寄せる

                position: 'absolute',
                border: '1px solid #ccc',
                background: 'gray',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
            },
        }

        ////////css///////////css///////////css///////

        return (
            <Modal
                isOpen={this.state.IsOpenModal}
                onRequestClose={this.closeModal.bind(this)}
                style={customStyles}
                contentLabel="Login Modal"
            >
                <div style={modalContainer}>
                    <div style={modalText}>
                        <form>
                            <h1>仮ログイン画面</h1>
                            <p>メールアドレス</p>
                            <input type="email" />
                            <p>パスワード</p>
                            <input type="password" />
                            <br />
                            <button>ログイン</button>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
};

export default LoginModal;