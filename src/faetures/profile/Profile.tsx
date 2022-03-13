import React, {ChangeEvent, useRef} from "react";
import {LoginUserInfo} from "../../api/authAPI";
import s from './profile.module.css'
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {CameraOutlined, CheckOutlined, EditOutlined, LogoutOutlined} from "@ant-design/icons";
import {File} from "../../components/file/File";


type ProfileProps = {
    user: LoginUserInfo
    changeEditMode: () => void
    changeName: (value: string) => void
    name: string
    editMode: boolean
    updateUserInfo: () => void
    onChangeAvatar: (file: string | ArrayBuffer | null) => void
}

export const Profile: React.FC<ProfileProps> = (
    {user, onChangeAvatar, changeEditMode, editMode, changeName, name, updateUserInfo}
) => {
    return <div className={s.profile}>
        <h3 className={s.profileTitle}>Personal information</h3>
        {
            editMode
                ? <SuperButton className={`${s.profileButton} ${s.saveButton}`} onClick={updateUserInfo}>
                    <CheckOutlined/>
                </SuperButton>
                : <SuperButton className={`${s.profileButton} ${s.editButton}`} onClick={changeEditMode}>
                    <EditOutlined/>
                </SuperButton>
        }
        <div className={s.profileInfo}>
            <div className={s.profilePhotoBlock}>
                <img
                    src={user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'}
                    alt={user.name} className={s.profilePhoto}
                />
                {
                    editMode
                        ? <div className={s.photoDiv}>
                            <File className={s.photoInput} onChangeFile={onChangeAvatar}/>
                            <CameraOutlined/>
                        </div>
                        : <></>
                }
            </div>

            {editMode
                ? <div className={s.profileItem}>
                    <SuperInputText className={s.profileFields} value={name} onChangeText={changeName}/>
                </div>
                : <div className={s.profileName}>
                    {user.name}
                </div>
            }
        </div>
    </div>
}