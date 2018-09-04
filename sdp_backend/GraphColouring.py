
# coding: utf-8

# In[59]:


#Authors:katOfGondor   
#The sky is falling, the wind is calling, stand for something or die in the morning


# In[60]:
import sys
import json
arr_courses = sys.argv[1]
def getCourseStudents(groupedExamList,studentArray):
    courseStudents=[]
 
    for i in range(0,len(groupedExamList)):
        temp=[]
        for j in range(0,len(studentArray)):
            if studentArray[j][0][4] in groupedExamList[i][0][0]:
                temp.append(studentArray[j][0][0])
                
        
        courseStudents.append(temp)
    #print(courseStudents)    
    #print("The kingdom")   
    #print(courseStudents[len(courseStudents)-1])    
    return courseStudents


# In[61]:


class Extractor():

    


    def Read(self,coursesFile,studentsFile):
        
        coursesArray=[]
        studentsArray=[]
        
        with open(coursesFile,'r') as readFile:
            for line in readFile:
                coursesArray.append(line.strip('\n'))
       # print(coursesArray)
        
        with open(studentsFile,'r') as readFile:
            for line in readFile:
                temp=[]
                temp.append(line.strip('\n').split(','))
                studentsArray.append(temp)
                
                
      
        #print(studentsArray[:100])
                
                 
        #Now we need to group the courses
     
        groupedCourses=[]

        for i in range(0,len(coursesArray)):
            temp=[]
            
            for j in range(i,len(coursesArray)):
                
                if coursesArray[j][:8] in coursesArray[i]:
                    temp.append(coursesArray[j])
                  
            groupedCourses.append(temp) 
            #print(groupedCourses[len(groupedCourses)-1])
            
            if len(groupedCourses)>1 and len(groupedCourses[len(groupedCourses)-1])>=1 and (groupedCourses[len(groupedCourses)-1][0] in groupedCourses[len(groupedCourses)-2]):
                 groupedCourses.pop(len(groupedCourses)-1)
                            
        finalGroupedCourses=[]
        
        for i in range(0,len(groupedCourses)):
            
            temp1=[]
            temp2=[]
            temp3=[]
            container=[]
            
            for j in range(0,len(groupedCourses[i])):
                
                    if '/2' in groupedCourses[i][j]:
                            temp2.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j]) 
                       
                    if '/3' in groupedCourses[i][j]:
                            temp3.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j])
                            
                    if '/2' not in groupedCourses[i][j] and '/3' not in groupedCourses[i][j]:
                            temp1.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j])     
              
                       
            if len(temp1) >0:
                container.append(temp1)
            if len(temp2) >0:
                container.append(temp2)
            if len(temp3) >0:
                container.append(temp3)
                       
            
            finalGroupedCourses.append(container)              
        
        #print(studentsArray[:100])
        # print("All the grouped courses are:")
        # print(finalGroupedCourses)
        
        selectedCourses=arr_courses.split(',')
        # print(len(selectedCourses))
        finalCourses=[]
        for i in range(0,len(selectedCourses)):
            for j in range(0,len(finalGroupedCourses)):
                if selectedCourses[i] in finalGroupedCourses[j][0][0]:
                    finalCourses.append(finalGroupedCourses[j])
                    
        # print()
        # print("The selected courses are: ")
        # print(finalCourses)   
            
            
        
        #getCourseStudents(self,finalGroupedCourses,studentsArray)  
    
        final=[finalCourses,studentsArray]
        
        return final  
                
        
        
    def Validate(self,allExamsList,regCourseList):
        exams=[]
        unscheduledExams=[]
        for i in range(0,len(regCourseList)):
            for exam in allExamList:
                if regCourseList[i] in exam:
                    exams.append(exam)
                else:
                    unscheduledExams.append(regCourseList[i])
                    
                    
        return exams 


# In[62]:


class Course():
    
   
    def __init__(self,courseList):
        
        self.exams=[]
        self.students=[]
        
        self.exams.append(courseList)
        #print(self.exams)
       
    
        
    def getNumStudents(self,students):
        numStudents=len(students)
        return numStudents
    
    def isStudent(self,studentNum,students):
        if studentNum in students:
            return true
        else:
            return false
    
    def getNumExams(self):
        numExams=len(self.exams[0])
        return numExams
    


# In[ ]:





# In[63]:


class GraphColouring():
    
    
    
    def __init__(self,vertexCount,theParameter):
        
        self.adjacencyMatrix=[]
        self.vertexCount=vertexCount
        self.vertexColours=[]
        self.clashes=[]
        self.clashParameter=theParameter
        self.maxSessions=int(sys.argv[2])
        
        
        for i in range(0,self.vertexCount):
            temp=[0]*vertexCount
            self.adjacencyMatrix.append(temp)
        
       # print(self.adjacencyMatrix)    
        self.vertexColours =[-1]*vertexCount
        #print(self.vertexColours)
        
    
    def getWeight(self,course1,course2):
        weight = 0
        if len(course1) >= len(course2):
            for i in range(0,len(course2)):
                if course2[i] in course1:
                    weight = weight+1
        else:
              for i in range(0,len(course1)):
                if course1[i] in course2:
                    weight = weight+1
            
        return weight
          
    
    def addEdge(self,i,j,weight):
        if (i>=0 and i<self.vertexCount) and  (j>=0 and j<self.vertexCount) and(i!=j):
            self.adjacencyMatrix[i][j]=weight
            self.adjacencyMatrix[j][i]=weight
            
    def isEdge(self,i,j):
        if (i>=0 and i<self.vertexCount) and  (j>=0 and j<self.vertexCount):
            if(adjacencyMatrix[i][j]!=0):
                return true
            else:
                return false
            
            
    def getNeighbours(self,vertex):
        neighbours=[]
        
        for i in range(0,len(self.adjacencyMatrix)):
            if self.adjacencyMatrix[i][vertex]!=0:
                neighbours.append(i)
                
                
        return neighbours
    
    def getDegree(self,vertex):
        degree=len(self.getNeighbours(vertex))
        
        return degree
    
    
    def setColour(self,vertex):
        colour=-1
        usedColours=[]
        neighbours=self.getNeighbours(vertex)
        
        for i in range(0,len(neighbours)):
            if self.vertexColours[neighbours[i]]!=-1:
                usedColours.append(self.vertexColours[neighbours[i]])
        
        
        for c in range(0,len(usedColours)+1):
            if c not in usedColours:
                colour=c
                
                break
                
       # print(colour)
        self.vertexColours[vertex]=colour
            


# In[64]:


extract=Extractor()
resultArray=extract.Read('myCourses.csv','myStudents.csv')

courseStudents=getCourseStudents(resultArray[0],resultArray[1]) 
#print(resultArray[1])
#print(resultArray[0])
#print(courseStudents)

#print(courseStudents[32])

theParameter=int(sys.argv[3])

while True:

    graph=GraphColouring(len(resultArray[0]),theParameter)
    #print(graph.adjacencyMatrix[:1])

    #ans=graph.getWeight(courseStudents[0],courseStudents[3])
    #print(ans)


    for i in range(0,len(courseStudents)):
        #print("i is :")
        #print(i)
        for j in range(0,len(courseStudents)):
            #print(j)

            if graph.getWeight(courseStudents[i],courseStudents[j]) >= graph.clashParameter:

                graph.addEdge(i,j,graph.getWeight(courseStudents[i],courseStudents[j]))
                graph.addEdge(j,i,graph.getWeight(courseStudents[i],courseStudents[j]))

            elif graph.getWeight(courseStudents[i],courseStudents[j])!=0:

                temp=[]

                temp.append(i)
                temp.append(j)
                temp.append(graph.getWeight(courseStudents[i],courseStudents[j]))

                graph.clashes.append(temp)


    #print(graph.clashes)           

     #print(len(graph.adjacencyMatrix))

    #print(graph.adjacencyMatrix)
    degrees=[]

    for i in range(0,len(graph.adjacencyMatrix)):
        degrees.append(graph.getDegree(i))

    #print(degrees) 

    maxValue=max(degrees)+1;
    sortedVertices=[]

    for i in range(0,len(degrees)):
        index=degrees.index(min(degrees))
        sortedVertices.append(index)
        degrees[index]=maxValue

    #print(sortedVertices)

    for i in range(0,len(sortedVertices)):
        graph.setColour(sortedVertices[i])

    #print(graph.vertexColours)
    sessions=[]
    sessionData=[]

    for i in range(0,max(graph.vertexColours)+1):
        temp=[]
        temp1=[]
        for j in range(0,len(graph.vertexColours)):
            if graph.vertexColours[j] == i:
                temp.append(j)
                temp1.append(resultArray[0][j][0][0][:8])


        sessions.append(temp)
        sessionData.append(temp1)

    # print()
    # print("The number of sessions are: ")
    # print(len(sessions))
          

    if len(sessions) > graph.maxSessions:
        theParameter=theParameter+1
    else:
        break

    # print("The parameter is:")
    # print(graph.clashParameter)
print(json.dumps(sessionData)) 

# In[ ]:



    
    
    
    




