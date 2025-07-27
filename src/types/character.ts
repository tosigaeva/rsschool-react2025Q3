export interface Character {
  name: string;
  birth_year: string;
  gender: string;
  url: string;
}

export interface CharacterDetails extends Character {
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  url: string;
}
