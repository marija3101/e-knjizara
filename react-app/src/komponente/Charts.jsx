
import Chart from 'react-google-charts'
import { useEffect, useState } from 'react'
import axios from 'axios'



const pieOptions = {
  title: 'Percentage of authors\' books',
  pieHole: 0.4,
}



const Charts = () => {
    
    
    
    const [viewBook, setBook] = useState([]);
   
   
   
   
    useEffect(() => {
        document.title = "View Book";
          axios
            .get('/api/view-book')
            .then(res => {
                console.log(res.data.books);
              if (res.data.status === 200) {
                  setBook(res.data.books);
       
                }
            
                
            });
        }, []);


        const [viewAuthor, setAuthor] = useState([]);
   
   
   
   
        useEffect(() => {
            document.title = "View Author";
              axios
                .get('/api/view-author')
                .then(res => {
                    console.log(res.data.author);
                  if (res.data.status === 200) {
                      setAuthor(res.data.author);
           
                    }
                
                    
                });
            }, []);

 let noviNiz = [['prva','druga']]; let brojac = 1;
          viewAuthor.map((item) =>{ viewBook.map((item2) =>{if(item.id == item2.author_id) { 
           brojac++;}  })
           
           noviNiz.push([item.name, brojac]); 
          brojac =0;}
           ); 
            console.log(noviNiz);  


















    return (
      <div className="container mt-5">
        <h2>Authors and their books</h2>
                <Chart
                width={'600px'}
                height={'320px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={noviNiz}
                options={pieOptions}
                rootProps={{ 'data-testid': '3' }}
              />

      </div>
    )
    }


export default Charts;


