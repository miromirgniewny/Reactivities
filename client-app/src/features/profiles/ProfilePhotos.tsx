import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Card, Header, Tab, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { UseStore } from "../../app/stores/store";
import ProfilePhotoItemUser from "./ProfilePhotoItemUser";
import ProfilePhotoItemViewer from "./ProfilePhotoItemViewer";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore } = UseStore();
    const { isCurrentUser, uploadPhoto,
        uploading, setMainPhoto, deletePhoto } = profileStore

    const [addPhotoMode, setAddPhotoMode,] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                    <Card.Group itemsPerRow={5}>
                         {isCurrentUser ? (
                               <>
                               {profile.photos?.map(photo => (
                                   <ProfilePhotoItemUser 
                                        photo={photo} 
                                        target={target} 
                                        handleSetMainPhoto={handleSetMainPhoto} 
                                        handleDeletePhoto={handleDeletePhoto}
                                        key={photo.id} 
                                    />
                               ))}
                               </>
                            ) :
                            (
                                <>
                                {profile.photos?.map(photo => (
                                    <ProfilePhotoItemViewer 
                                        photo={photo}
                                        key={photo.id} 
                                    />
                                ))}
                                </>
                            )}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})