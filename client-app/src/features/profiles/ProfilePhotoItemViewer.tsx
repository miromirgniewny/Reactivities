import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Photo } from "../../app/models/profile";

interface Props {
    photo: Photo;
}

export default function ProfilePhotoItemViewer({photo} : Props) {
    return (
        <Card>
            <Image src={photo.url} />
        </Card>

    )
}