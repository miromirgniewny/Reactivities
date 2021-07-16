import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Card, Image, Popup, Icon } from "semantic-ui-react";
import { Photo } from "../../app/models/profile";
import { UseStore } from "../../app/stores/store";

interface Props {
    photo: Photo;
    target: string;
    handleSetMainPhoto: (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => void;
    handleDeletePhoto: (photo: Photo, e:SyntheticEvent<HTMLButtonElement>) => void;
}

export default observer(function ProfilePhotoItemUser({ photo, target, handleSetMainPhoto, handleDeletePhoto } : Props) {
    const {profileStore} = UseStore();
    const {loading} = profileStore

    return (
        <Popup
            trigger={
            <Card>
                <Image src={photo.url} />
            </Card>}
            hoverable
            flowing
            position='bottom center'
        >
        
            <Button
                animated
                basic
                circular
                color='green'
                size='tiny'
                name={photo.id}
                disabled={photo.isMain}
                loading={target === photo.id && loading}
                onClick={e => handleSetMainPhoto(photo, e)}
            >
                <Button.Content visible>Main</Button.Content>
                <Button.Content hidden><Icon name='user' /></Button.Content>
            </Button>
        
            <Button
                basic
                circular
                negative
                name={`${photo.id}.del`}
                size='tiny'
                color='red'
                icon='trash'
                onClick={e => handleDeletePhoto(photo, e)}
                loading={target === `${photo.id}.del` && loading}
                
            />

        
    
</Popup>

    )   
})