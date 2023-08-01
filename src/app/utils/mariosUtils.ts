import { Marios } from 'src/app/interfaces/marios';
import { MARIOS_TYPES_ICON_NAMES } from 'src/app/constants/mariosTypesIcons';

export function compareByCreationInstantDesc( a: Marios, b: Marios ) {
    if ( a.creationInstant > b.creationInstant ){
      return -1;
    }
    if ( a.creationInstant < b.creationInstant ){
      return 1;
    }
    return 0;
  }
  
export function getIconMariosTypeName(index: number):string{
    if (index < MARIOS_TYPES_ICON_NAMES.length){
      return MARIOS_TYPES_ICON_NAMES[index];
    }
    else{
      return MARIOS_TYPES_ICON_NAMES[0];
    }
  }