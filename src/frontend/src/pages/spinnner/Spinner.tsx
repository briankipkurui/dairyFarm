import PropagateLoader from "react-spinners/PropagateLoader";
export default function Spinner() {
    return (
        <div>
            <main className='flex justify-center items-center  mx-3 mt-16 sm:ml-[300px] sm:mt-3'>
                <p>
                    <PropagateLoader
                        color={'#008000'}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </p>
            </main>
        </div>
    )
}