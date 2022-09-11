import { Card } from "../ui/Card";
import CheckBox from "../ui/CheckBox";
import ColumnContainer from "../ui/ColumnContainer";
import InputLabel from "../ui/InputLabel";
import RowContainer from "../ui/RowContainer";

interface PropertiesFilterProps {
    _id: string;
    values: string[];
}

const PropertiesFilter = ({ _id, values }: PropertiesFilterProps) => {
    return <Card>
        <InputLabel>
            {_id}
        </InputLabel>
        <ColumnContainer>
            {values.map(value => <RowContainer>
                <CheckBox /> {value}
            </RowContainer>)}
        </ColumnContainer>
    </Card>
}

export default PropertiesFilter;