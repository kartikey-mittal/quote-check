import React, { useState, useEffect } from 'react';
import { FaSave, FaTrash, } from 'react-icons/fa';
import './button.css'
const App = () => {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('quote');

  useEffect(() => {
    fetchRandomQuote();
    loadSavedQuotes();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleSave = () => {
    if (!savedQuotes.includes(quote)) {
      const updatedQuotes = [...savedQuotes, quote];
      setSavedQuotes(updatedQuotes);
      localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
    }
  };

  const handleDelete = (quoteToDelete) => {
    const updatedQuotes = savedQuotes.filter(q => q !== quoteToDelete);
    setSavedQuotes(updatedQuotes);
    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
  };

  const loadSavedQuotes = () => {
    const saved = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    setSavedQuotes(saved);
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' ,backgroundImage: 'url(https://img.freepik.com/free-vector/gray-geometric-shapes-wireframe-wave-background-vector_53876-177919.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722384000&semt=ais_hybrid)',
      backgroundSize: 'cover',
    }}>
      <div style={{ 
        width: '50%', 
        height: '80%', 
        borderRadius: '15px', 
        overflow: 'hidden', 
        backgroundColor: 'white', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' 
      }}>
        <div style={{ 
          display: 'flex', 
          borderBottom: '0px solid #ccc', 
          marginBottom: '10px' 
        }}>
          <div 
            onClick={() => setActiveTab('quote')} 
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '15px', 
              cursor: 'pointer', 
              fontFamily: activeTab === 'quote' ? 'MB' : 'MR', 
              color: activeTab === 'quote' ? 'black' : 'gray', 
              backgroundColor: activeTab === 'quote' ? 'transparent' : '#f8f8f8',
              position: 'relative' 
            }}
          >
            Quote
            {activeTab === 'quote' && (
              <div style={{ 
                width: '70%', 
                height: '2px', 
                backgroundColor: 'black', 
                position: 'absolute', 
                bottom: '0', 
                left: '15%' 
              }}></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('saved')} 
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '15px', 
              cursor: 'pointer', 
              fontFamily: activeTab === 'quote' ? 'MB' : 'MR', 
              color: activeTab === 'saved' ? 'black' : 'gray', 
              backgroundColor: activeTab === 'saved' ? 'transparent' : '#f8f8f8',
              position: 'relative' 
            }}
          >
            Saved
            {activeTab === 'saved' && (
              <div style={{ 
                width: '70%', 
                height: '2px', 
                backgroundColor: 'black', 
                position: 'absolute', 
                bottom: '0', 
                left: '15%' 
              }}></div>
            )}
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          height: 'calc(100% - 60px)', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}>
          {activeTab === 'quote' ? (
            <div style={{ 
              borderRadius: '10px', 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', 
              position: 'relative', 
              height: '100%',marginBottom:50 ,backgroundImage: 'url(https://img.freepik.com/premium-photo/grunge-texture-black-background_53876-149699.jpg)',
              backgroundSize: 'cover',
            }}>
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
  <button
    className="button"
    onClick={fetchRandomQuote}
    style={{ 
      border: 'none', 
      borderRadius: '20px', 
      padding: '10px 20px', 
      background: 'linear-gradient(45deg, #6a11cb, #2575fc)', 
      color: 'white', 
      cursor: 'pointer', 
      fontSize: '16px', 
      fontFamily: 'DMM, sans-serif', 
      marginBottom: '20px',
      alignSelf: 'center'
    }}
  >
    Generate Quote
  </button>
</div>

               
              <div style={{ 
                marginBottom: '0px',marginTop:'10px' ,
                fontFamily: 'MB, sans-serif' ,fontSize:'2rem',color:'wheat',textAlign:'center'
              }}>
                "{quote}"
              </div>
              
              <button 
                onClick={handleSave} 
                style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  right: '20px', 
                  backgroundColor: '#562ed9', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '10px', 
                  padding: '10px', 
                  cursor: 'pointer' ,fontFamily:'MR',
                }}
              >
                <FaSave />   Save
              </button>
            </div>
          ) : (
            <div style={{ 
              height: '100%', 
              overflowY: 'auto', 
              padding: '20px', 
              backgroundColor: '#f9f9f9' ,backgroundImage: 'url(https://img.freepik.com/premium-photo/grunge-texture-black-background_53876-149699.jpg)',
      backgroundSize: 'cover',marginBottom:30,borderRadius:'10px'
            }}>
              {savedQuotes.length === 0 ? (
                <div style={{color:'RED',fontSize:'2rem',fontFamily:'MB'}}>No saved quotes</div>
              ) : (
                savedQuotes.map((savedQuote, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      borderRadius: '10px', 
                      padding: '20px', 
                      backgroundColor: '#fff', 
                      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', 
                      marginBottom: '10px', 
                      position: 'relative' ,borderTopWidth:5,borderLeftWidth:5,borderRightWidth:5,borderBottomWidth:10,borderColor:'#0e344d'
                    }}
                  >
                    <div style={{ fontFamily: 'DMM, sans-serif', }}>{savedQuote}</div>
                    <button 
                      onClick={() => handleDelete(savedQuote)} 
                      style={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        right: '10px', 
                        backgroundColor: '#212121', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        padding: '5px', 
                        cursor: 'pointer' 
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
