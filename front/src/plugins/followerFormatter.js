export default function followerFormatter (num) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find((item) => {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0";
}