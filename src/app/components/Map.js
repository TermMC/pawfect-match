import { GoogleMapsEmbed } from '@next/third-parties/google'

export default async function ShelterMap({shelterLocation}) {

    return (
        <GoogleMapsEmbed
            apiKey="AIzaSyDmnxYGe-UlwBQaLJg2djIqI64-SeeiCUI"
            height={300}
            width="100%"
            mode="place"
            q={shelterLocation}
        />
    )
}