import {useEffect, useState} from 'react';
import theCatsApi from '../API/TheCatsApi';
import {Cat} from '../models/Cat';
import {Breed} from '../models/Breed';
import {BreedImage} from '../models/BreedImage';
import {Axios, isAxiosError} from 'axios';

interface CatsState {
  isLoadingCats: boolean;
  cats: Cat[];
}

export const useCats = () => {
  const [initialState, setInitialState] = useState<CatsState>({
    isLoadingCats: true,
    cats: [],
  });

  const fetchCatData = async () => {
    try {
      const catsRequest = await theCatsApi.get<Breed[]>('breeds');
      const catsBreeds = catsRequest.data;

      const catPromises = catsBreeds.map(async cat => {
        const newCat: Cat = {
          bredName: cat.name,
          origin: cat.origin,
          affectionLevel: cat.affection_level,
          intelligence: cat.intelligence,
          imageUrl: '',
        };

        if (cat.reference_image_id) {
          try {
            const catBreedImageRequest = await theCatsApi.get<BreedImage>(
              `images/${cat.reference_image_id}`,
            );
            const catBreedImage = catBreedImageRequest.data;
            newCat.imageUrl = catBreedImage?.url;
          } catch (error) {
            console.error('Error fetching cat breed image:', error);
          }
        }
        console.log(newCat);
        

        return newCat;
      });

      const cats = await Promise.all(catPromises);

      setInitialState({
        isLoadingCats: false,
        cats: cats,
      });
    } catch (error) {
      console.error('Error fetching cat data:', error);
      if (isAxiosError(error)) {
        console.log(error.response!.data);
      }
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return {
    ...initialState,
  };
};
