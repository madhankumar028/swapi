import { CircularProgress, makeStyles, createStyles } from "@material-ui/core";

import { useGetAll } from "../../hooks";

interface IArrayData {
  data: Object[];
  arrayName: string;
  field: string;
};

const useStyles = makeStyles(() => createStyles({
  field: {
    color: "#8b949e",
    fontWeight: "bold",
    marginRight: 5,
  },
  fieldContainer: {
    margin: "20px 0",
  },
}));

const ColorValue = ({ value }) => {
  return value.split(", ").map(color => (
    <div key={color} style={{ display: "flex", alignItems: "center" }}>
      <span>{color}</span>
    </div>
  ));
};

const Attribute = ({ field, value }) => {
  const styles = useStyles();
  return (
    <div className={styles.fieldContainer} style={{ display: "flex" }}>
      <span className={styles.field} style={{ width: "35%" }}>{field}: </span>
      {
        field.includes("COLOR")
          ? <ColorValue value={value} />
          : <span style={{ textTransform: "capitalize", width: "50%" }}>{value}</span>
      }
    </div>
  );
};

const ArrayData = (props: IArrayData) => {
  const { data, arrayName, field } = props;
  const styles = useStyles();
  const [results, loading] = useGetAll(data, arrayName);

  const getAttributeList = () => {
    if (results instanceof Array) {
      return results.map(item => item[field]).join(", ");
    };
    return "-";
  };

  return (
    <div className={styles.fieldContainer}>
      <span className={styles.field}>{arrayName.toUpperCase()}: </span>
      <span>
        {
          loading ? (
            <>
              <CircularProgress size={16} style={{ marginLeft: 10 }} />
              <span style={{ marginLeft: 10 }}>Loading {arrayName}...</span>
            </>
          ) : getAttributeList()
        }
      </span>
    </div>
  );
};

export { Attribute, ArrayData };
