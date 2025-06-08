import s from './loader.module.css';

function Loader({ color, width, height, positionLeft,positionRight }) {
    return (
        <span
            className={s.loader}
            width={width}
            height={height}
            style={{
                border: `5px dotted ${color}`,
                width: `${width}px`,
                height: `${height}px`,
                left: positionLeft,
                right: positionRight
            }}
        >
            {''}
        </span>
    );
}

export default Loader;
