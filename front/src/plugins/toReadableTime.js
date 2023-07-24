export default function toReadableTime (miliSeconds) {
    const minutes = Math.floor(miliSeconds / 60000);
    const seconds = ((miliSeconds % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}