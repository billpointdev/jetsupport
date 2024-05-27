import { DateSeparator } from "stream-chat-react";
import Proptypes from "prop-types"

export const CustomDateSeparator = (props) => {
    const { date } = props

    function formatDate(date) {
        return `${date.toDateString()}`;
    }

    return (
        <DateSeparator
            formatDate={formatDate}
            date={date}
            position={'center'}
        />
    )
};

CustomDateSeparator.propTypes = {
    date: Proptypes.string,
}