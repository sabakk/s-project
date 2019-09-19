import { createSelector } from "reselect";

const vapeSelector = state => state.vape.posts;
const filterSelector = state => state.filter;

export const getVisibleVapes = createSelector(
  [vapeSelector, filterSelector],
  (vape, visibl) => {
    return vape
      .filter(post => {
        const textMatch = post.brand
          .toLowerCase()
          .includes(visibl.text.toLowerCase());

        return textMatch;
      })
      .sort((a, b) => {
        if (visibl.sortBy === "price") {
          return a.price < b.price ? 1 : -1;
        } else if (visibl.sortBy === "nicotine") {
          return a.nicotine < b.nicotine ? 1 : -1;
        }
      });
  }
);

// export const getVisibleVapes = ({ posts }, { text, sortBy }) => {
//   return posts
//     .filter(post => {
//       const textMatch = post.brand.toLowerCase().includes(text.toLowerCase());

//       return textMatch;
//     })
//     .sort((a, b) => {
//       if (sortBy === "nicotine") {
//         return a.price < b.price ? 1 : -1;
//       } else if (sortBy === "volume") {
//         return a.volume < b.volume ? 1 : -1;
//       }
//     });
// };
