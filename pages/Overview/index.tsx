import { useState, useMemo } from "react";
import styles from './Overview.module.css'

interface Advisor {
  id: number,
  firstName: string,
  lastName: string,
  language: string,
  // I should have named that onlineState, but it could also be taken as a curious mistake by backend team and frontend as to deal with it. ;)
  isOnline: string 
}

type sortConfig = {
  key: string,
  direction: string
}

const useSortableData = (items: Advisor[] = [], config: sortConfig | null = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  
  const sortedItems: Advisor[] = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, sortConfig };
}

// const useFilterableData  = (items: Advisor[] = [], selectedLanguage: string | null = null) => {
//   const [language, setLanguage] = useState(selectedLanguage);
//   const filteredItems: Advisor[] = useMemo(() => {

//     if(language) {
//       return items.filter((item)=>{
//         return item.language === language;
//       });
//     }

//   }, [items, language]); 
  
//   // const filter = () => {
//   //   setLanguage(lang)
//   // }
  
// };

const Overview = ({advisors}) => {
  const { items, requestSort, sortConfig } = useSortableData(advisors);
  //const { filteredItems, filter, selectedLanguage } = useFilterableData(advisors);

  //const { items }

  const getClassNamesFor = (name: string): string | undefined => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return(

    <main className={styles.overview}>
      <table>
        <caption>Our Advisors</caption>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('firstName')}
                className={styles[getClassNamesFor('firstName')]}
              >
                Name
              </button>
              </th>
            <th>
            <button
                type="button"
                onClick={() => requestSort('language')}
                className={styles[getClassNamesFor('language')]}
              >
                Language
              </button>
            </th>
            <th>
            <button
                type="button"
                onClick={() => requestSort('isOnline')}
                className={styles[getClassNamesFor('isOnline')]}
              >
                Online
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName} {item.lastName}</td>
              <td>{item.language}</td>
              <td>{item.isOnline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
};
export default Overview;