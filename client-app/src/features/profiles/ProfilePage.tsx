import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { UseStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
    const {username} = useParams<{username: string}>();
    const {profileStore} = UseStore();
    const {loadProfile, loadingProfile, profile} = profileStore;

    useEffect(() => {
        loadProfile(username);
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    if (profile === null) return null;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile} />
                <ProfileContent profile={profile}/>
            </Grid.Column>
        </Grid>

    )
    
})