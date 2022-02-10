import { css } from "@emotion/react";
// import GridLoader from "react-spinners/GridLoader";
import styles from './Loading.module.scss'
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  margin: 0 auto;
  border-color: red;
`;

export default function Loading({color, loading, size}) {
  return (
    <div className={styles.loading}>
      {/* <GridLoader color={color} loading={loading} css={override} size={size} /> */}
    </div>
  )
}