import Autosuggest from 'react-autosuggest';
import { useState, useMemo } from 'react';

// styles
import * as S from './styled';

const useSuggestedData = (items: string[]) => {
  const [value, setNewValue] = useState('');

  // Autosuggest per default pre-selects only the first suggestion on key down or up
  // https://github.com/moroshko/react-autosuggest/issues/651
  // work-around:
  const onChange = (event, { newValue, method }) => {
    if (method === 'type' || method === 'enter' || method === 'click') {
      setNewValue(newValue);      
    }
    // This updates the input un key up and down,
    // but also updates the list of suggestions, which is undesired
    // I decided to turn this off and to go for choosing a suggestion with key up or down
    // because it is the best for the user.
    // if (method === 'up' || method === 'down') {
      //setNewValue(newValue);
    // }
  };

  /**
   * Listens to value
   * suggestions are updated based on input value
   */
  const suggestions = useMemo((): string[] => {
    const inputValue: string = value.trim().toLowerCase();
    const inputLength: number = inputValue.length;
    return inputLength === 0 ? [] : items.filter((item: string) => {
      return item.toLowerCase().slice(0, inputLength) === inputValue
    });
  }, [value])

  /**
   * Fired when input changes
   * An Autosuggest function. Required.
   */
  const onSuggestionsFetchRequested = (): void => {
    // fill it with life, if necessary
  };

  /**
   * Fired when input gets cleared
   * An Autosuggest function. Required.
   */
  const onSuggestionsClearRequested = (): void => {
    // fill it with life, if necessary
  };

  return {
    value,
    suggestions,
    onChange,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested
  };
}; 

const Search = ({items}): JSX.Element => {
  const { 
    value,
    suggestions,
    onChange,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
  } = useSuggestedData(items);

  /**
    * returns property of suggestion
    * I leave it here, for myself, because suggestions can be objects as well
    * @example const getSuggestionValue = suggestion => suggestion.text;
    * @param suggestion string
    */
  const getSuggestionValue = (suggestion: string): string => {
    // There is a bug in Autosuggest. This is a work-around to avoid user-facing errors.
    // https://github.com/moroshko/react-autosuggest/issues/777
    return suggestion ? suggestion : value;
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Search for fruits',
    value,
    onChange: onChange,
  };

  /**
   * Returns two strings. The first for the highlighted part and the second as non-highlighted part
   * @param suggestion 
   * @param query 
   */
  const getQueriedSuggestion = (suggestion: string, query: string) => {
    const first = suggestion.substring(0 , query.length);
    const last = suggestion.substring(query.length , suggestion.length);
    return {first, last};
  };

  /**
   * Renders Suggestions
   * @param suggestion 
   * @param object { query: string, isHiglighted: boolean} 
   */
  const renderSuggestion = (suggestion: string, { query, isHighlighted } ): JSX.Element => {
    const { first, last } = getQueriedSuggestion(suggestion, query);
    return (
        <S.Suggestion highlight={isHighlighted}>
          {<b>{first}</b>}{last}        
        </S.Suggestion>
      )
    };
  
  return(
    <Autosuggest
      theme={S.getSearchStyles()}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};
export default Search;