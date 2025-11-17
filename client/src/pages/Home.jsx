import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';

function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  console.log(rentListing);
  console.log(saleListing);
  console.log(offerListing);
  SwiperCore.use([Navigation])
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${process.env.VITE_API_URL}/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${process.env.VITE_API_URL}/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        {/* <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span> */}
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-xl'>
          <span className='font-bold text-slate-700'>99</span><span className='font-bold text-slate-700'>Bigha</span> is the best place to find your next
          perfect place to live
          <br />
          We have a wide range of properties for you to
          choose from.
        </div>
        {/* <div className='text-[#A0522D] text-xs sm:text-sm'>
          99 Bigha is the best place to find your next
          perfect place to live
          <br />
          We have a wide range of properties for you to
          choose from.
        </div> */}
        <Link to={"/search"} className='text-xs sm:text-xl text-blue-800 font-bold hover:underline'>
          Let's get Started...
        </Link>
        {/* <Link to={"/search"} className='text-xs sm:text-sm text-[#228B22] font-bold hover:underline'>
          Let's get Started...
        </Link> */}
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listin result for offer, sale and rent  */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* offer  */}
        {offerListing && offerListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              {/* <h2 className='text-2xl font-semibold text-[#A0522D]'>Recent offers</h2> */}
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
              {/* <Link className='text-sm text-[#228B22] hover:underline' to={'/search?offer=true'}>Show more offers</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* rent  */}
        {rentListing && rentListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              {/* <h2 className='text-2xl font-semibold text-[#A0522D]'>Recent places for rent</h2> */}
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
              {/* <Link className='text-sm text-[#228B22] hover:underline' to={'/search?type=rent'}>Show more places for rent</Link> */}
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* sale  */}
        {saleListing && saleListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>   
              {/* <h2 className='text-2xl font-semibold text-[#A0522D]'>Recent places for sale</h2>    */}
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home