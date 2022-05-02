export function sortAnswers(arrayAnswers) {
    const compare = ( firstElement, secondElement) => {
        if ( firstElement.value < secondElement.value ){
          return -1;
        }
        if ( firstElement.value > secondElement.value ){
          return 1;
        }
        return 0;
      }
      
    const answersSort = arrayAnswers.sort( compare );

    return answersSort;
}