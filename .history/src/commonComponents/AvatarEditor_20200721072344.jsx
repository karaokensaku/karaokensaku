import React ,{useContext}from 'react'
import Avatar from 'react-avatar-editor'
import { AuthContext } from '../store/AuthService'

class AvatarEditor extends React.Component {

    constructor(props) {
        super(props)
        const src = user.
        this.state = {
            preview: null,
            src
        }
        const user = useContext(AuthContext);   //Contextオブジェクト(AuthContext)のproviderに指定したValueプロパティーのuserを受け取る
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }
    
    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    render() {
        return (
            <div>
                <Avatar
                    width={390}
                    height={295}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src}
                />
                <img src={this.state.preview} alt="Preview" />
            </div>
        )
    }
}

export default AvatarEditor ;