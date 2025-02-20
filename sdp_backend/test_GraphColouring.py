
# coding: utf-8

# In[5]:


import unittest
import GraphColouring
from GraphColouring import GraphColouring as gc


# In[6]:


class TestColouring(unittest.TestCase):
    
    def test_read(self):
   
        coursesArray=[[['COMS1017/1'], ['COMS1017/2']], [['COMS1018/1']], [['COMS1015/1']], [['MATH1014/1']], [['MATH1036/1']], [['PHYS1000/1'], ['PHYS1000/2']], [['APPM1006/1']], [['ECON1000A/1', 'ECON1000/1'], ['ECON1000A/2', 'ECON1000/2']], [['INFO1004/1'], ['INFO1004/2']], [['PSYC1015/1']], [['PSYC1018/1']], [['PSYC1017/1', 'PSYC1017A/1']], [['ACCN1036/1']], [['ACCN1014/1']], [['THEO1006/1']]]
        studentsArray=[[['797880', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['797880', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['797880', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['797880', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['797880', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['797880', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1365125', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1365125', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1365125', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1335952', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1335952', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['1335952', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1490000', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1490000', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1490000', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1490000', 'REGISTERED', '2018', 'CB001', 'ECON1000A']], [['1490000', 'REGISTERED', '2018', 'CB001', 'INFO1004']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1373679', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1373679', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1373679', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1373679', 'REGISTERED', '2018', 'CB001', 'INFO1004']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['1345962', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1345962', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['889442', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['889442', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['889442', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['889442', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['889442', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['889442', 'REGISTERED', '2018', 'CB001', 'THEO1006']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1017A']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1395256', 'REGISTERED', '2018', 'CB001', 'THEO1006']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1475896', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1475896', 'REGISTERED', '2018', 'CB001', 'APPM1006']]]
        
        result=GraphColouring.Extractor.Read(self,'myPapers.csv','myStudents.csv')
        #if read worked correctly then result[0] and result[1] have none-zero length
        self.assertNotEqual(len(result[0]),0)
        self.assertNotEqual(len(result[1]),0)
        #self.assertEqual(result[0],coursesArray)
        #self.assertEqual(result[1],studentsArray)
     
    def test_courseStudents(self):
        
        coursesArray=[[['COMS1017/1'], ['COMS1017/2']], [['COMS1018/1']], [['COMS1015/1']], [['MATH1014/1']], [['MATH1036/1']], [['PHYS1000/1'], ['PHYS1000/2']], [['APPM1006/1']], [['ECON1000A/1', 'ECON1000/1'], ['ECON1000A/2', 'ECON1000/2']], [['INFO1004/1'], ['INFO1004/2']], [['PSYC1015/1']], [['PSYC1018/1']], [['PSYC1017/1', 'PSYC1017A/1']], [['ACCN1036/1']], [['ACCN1014/1']], [['THEO1006/1']]]
        studentsArray=[[['797880', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['797880', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['797880', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['797880', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['797880', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['797880', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1365125', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1365125', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['1365125', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1365125', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1335952', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1335952', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1335952', 'REGISTERED', '2018', 'CB001', 'PHYS1000']], [['1335952', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1490000', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1490000', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1490000', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1490000', 'REGISTERED', '2018', 'CB001', 'ECON1000A']], [['1490000', 'REGISTERED', '2018', 'CB001', 'INFO1004']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1018']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1015']], [['1373679', 'REGISTERED', '2018', 'CB001', 'MATH1014']], [['1373679', 'REGISTERED', '2018', 'CB001', 'MATH1036']], [['1373679', 'REGISTERED', '2018', 'CB001', 'COMS1017']], [['1373679', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1373679', 'REGISTERED', '2018', 'CB001', 'INFO1004']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1345962', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['1345962', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1345962', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['889442', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['889442', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['889442', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['889442', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['889442', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['889442', 'REGISTERED', '2018', 'CB001', 'THEO1006']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1017A']], [['1395256', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1395256', 'REGISTERED', '2018', 'CB001', 'THEO1006']], [['1395256', 'REGISTERED', '2018', 'CB001', 'PSYC1018']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1017']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1475896', 'REGISTERED', '2018', 'CB001', 'APPM1006']], [['1475896', 'REGISTERED', '2018', 'CB001', 'PSYC1015']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1014']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ACCN1036']], [['1475896', 'REGISTERED', '2018', 'CB001', 'ECON1000']], [['1475896', 'REGISTERED', '2018', 'CB001', 'APPM1006']]]
        
        courseStudents=[['1365125', '1335952', '1373679'], ['797880', '1365125', '1335952', '1490000', '1373679'], ['797880', '1365125', '1335952', '1490000', '1373679'], ['797880', '1365125', '1335952', '1490000', '1373679'], ['797880', '1365125', '1373679'], ['797880', '1365125', '1335952'], ['797880', '1335952', '1345962', '1475896', '1475896'], ['1490000', '1373679', '1345962', '889442', '1395256', '1475896', '1475896'], ['1490000', '1373679'], ['1345962', '1395256', '1475896', '1475896'], ['1345962', '889442', '1395256', '1395256'], ['1345962', '889442', '1475896'], ['889442', '1395256', '1475896', '1475896'], ['889442', '1395256', '1475896', '1475896'], ['889442', '1395256']]
        result=GraphColouring.getCourseStudents(coursesArray,studentsArray)
        self.assertEqual(result,courseStudents)
        
    def test_weight(self):
        
        courseStudents=[['1365125', '1335952', '1373679',], ['797880', '1365125', '1335952', '1490000', '1373679']]
        result=gc.getWeight(self,courseStudents[0],courseStudents[1])
        self.assertEqual(result,3)
        
    def test_addEdge(self):
        TestColouring.adjacencyMatrix=[]
        row=[0,0,0,0,0,0,0,0,0,0]
        
        for i in range(0,9):
            TestColouring.adjacencyMatrix.append(row)
        
        result=gc.addEdge(self,0,9,7)
        
        self.assertEqual(TestColouring.adjacencyMatrix[0][9],7,TestColouring.adjacencyMatrix[9][0],7)
    
    def test_getNeighbbours(self):
        adjacencyMatrix=[[0,0,4,0,0],[0,0,9,0,0],[4,9,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        neighbours=[0,1]
        self.assertEqual(neighbours,gc.getNeighbours(self,2))
        
    def test_isEdge(self):
        adjacencyMatrix=[[0,0,4,0,0],[0,0,9,0,0],[4,9,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        self.assertTrue(gc.isEdge(self,0,2))
    
    def test_getDegree():
        self.assertEquals(gc.getDegree(self,2),2)
        
if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)

