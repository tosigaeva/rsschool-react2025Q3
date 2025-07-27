import {CardDetails} from "#/pages/search/components/card-details";
import type {Character} from "#/types";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

export const DetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchCharacter = async () => {
            try {
                //setIsLoading(true);
                const data = await getCharacterDetails(id!);
                setCharacter(data);
            } catch (error) {
                console.error('Failed to fetch character details:', error);
            } finally {
                //setIsLoading(false);
            }
        };

        fetchCharacter();

    }, [id]);

    return (
        <CardDetails details={character} onClick={() => navigate({pathname: '/', search: window.location.search,})} />
    );
}

async function getCharacterDetails(id: string): Promise<Character> {
    const response = await fetch(`https://swapi.py4e.com/api/people/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch character: ${response.status}`);
    }
    return response.json();
}