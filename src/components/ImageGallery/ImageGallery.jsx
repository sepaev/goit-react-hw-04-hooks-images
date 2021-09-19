import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { ImageGalleryUl } from './ImageGallery.styled';
import { v4 as uuidv4 } from 'uuid';
import { api, perPage } from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import 'react-toastify/dist/ReactToastify.css';

function ImageGallery({ changeStatus, newQuery }) {
  const [pages, setPages] = useState(0);
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNeighborImages, setModalNeighborImages] = useState(null);

  function toggleModal(e) {
    let images = null;
    if (e) {
      e.preventDefault();
      images = getNeighborImages(e.target.id);
    }
    setModalIsOpen(prev => !prev);
    setModalNeighborImages(images);
  }

  function getNeighborImages(id) {
    const quantity = hits.length;
    if (quantity < 1) return null;
    for (let i = 0; i < quantity; i++) {
      if (hits[i].id.toString() === id.toString()) {
        const prev = i === 0 ? hits[quantity - 1] : hits[i - 1];
        const next = i === quantity - 1 ? hits[0] : hits[i + 1];
        const curr = hits[i];
        return { prev, curr, next };
      }
    }
  }

  function changeNeighborImages(id) {
    const images = getNeighborImages(id);
    setModalNeighborImages(images);
  }

  async function getResponse(query, page) {
    try {
      const response = await api.get(`/`, {
        params: {
          q: query,
          page,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error - ' + response.status);
      }
    } catch (error) {
      changeStatus('rejected', error.message);
    }
  }

  function useResponseQuery(query) {
    const callback = useCallback(async () => {
      changeStatus('pending');
      await getResponse(query, 1).then(({ total, hits }) => {
        if (total > 0) {
          //найдено картинки
          const pages = total % perPage > 0 ? parseInt(total / perPage) + 1 : total / perPage;
          changeStatus('resolved', `Was found ${total} results. Avaliable ${pages} pages!`);
          setPages(pages);
        } else {
          //не найдено картинки
          changeStatus('idle', `Please, start new search.`);
          setPages(0);
        }
        setHits(hits);
        setQuery(newQuery);
        setPage(1);
      });
    }, [query]);
    return { callback };
  }
  const onChangeQuery = useResponseQuery(newQuery).callback;

  function useResponsePages(query, page) {
    const callback = useCallback(async () => {
      await getResponse(query, page).then(({ total, hits }) => {
        if (hits.length > 0) {
          changeStatus('resolved', `Added more ${perPage} pictures! Current page ${page} of ${pages} pages.`);
          setHits(prev => [...prev, ...hits]);
        }
      });
    }, [query, page]);
    return { callback };
  }
  const onChangePage = useResponsePages(query, page).callback;

  ////////first page

  useEffect(() => {
    if (!newQuery) return;
    onChangeQuery();
  }, [newQuery, onChangeQuery]);

  /////// pagination
  function loadMore() {
    setPage(prev => prev + 1);
  }

  useEffect(() => {
    if (query === '' || page < 2) return;
    onChangePage(); //callback
    window.setTimeout(e => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 300);
  }, [query, page, onChangePage]);
  ////// render
  return (
    <>
      <ImageGalleryUl>
        {hits.length > 0 &&
          hits.map(({ id, webformatURL, tags }) => {
            return <ImageGalleryItem key={uuidv4()} id={id} src={webformatURL} alt={tags} onClick={toggleModal} />;
          })}
      </ImageGalleryUl>
      {pages > page && <Button title={`load more ${perPage} pictures`} onClick={loadMore} />}
      {modalIsOpen && (
        <Modal
          modalNeighborImages={modalNeighborImages}
          exitFunc={toggleModal}
          changeNeighborImages={changeNeighborImages}
        />
      )}
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  newQuery: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
