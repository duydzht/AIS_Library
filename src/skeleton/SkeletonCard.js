import SkeletonElement from './SkeletonElement';

const SkeletonCard = () => {
    return (
        <div className=''>
            <div className='col-12 col-md-3 m-3'>
                <SkeletonElement type='image' />
            </div>
        </div>
    );
};

export default SkeletonCard;
