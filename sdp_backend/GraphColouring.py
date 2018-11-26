
# coding: utf-8

# In[59]:
    

#Authors:katOfGondor   
#The sky is falling, the wind is calling, stand for something or die in the morning


# In[60]:
import sys
import json
import math
import random
import operator

arr_courses = sys.argv[1]
#print(arr_courses)
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

def getExamStudents(session,studentArray):
    courseStudents=[]

    for i in range(0,len(session)):
        temp=[]
        for j in range(0,len(session[i])):
            for k in range(0,len(studentArray)):
                if studentArray[k][0][4] in session[i][j][0] and studentArray[k][0][0] not in temp:
                    temp.append(studentArray[k][0][0])



        courseStudents.append(temp)
    # print()    
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
            temp4=[]
            container=[]
            
            for j in range(0,len(groupedCourses[i])):
                
                    if '/2' in groupedCourses[i][j]:
                            temp2.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j]) 
                       
                    if '/3' in groupedCourses[i][j]:
                            temp3.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j])
                            
                    if '/4' in groupedCourses[i][j]:
                            temp4.append(groupedCourses[i][j])
                            
                    if '/2' not in groupedCourses[i][j] and '/3' not in groupedCourses[i][j] and'/4' not in groupedCourses[i][j]:
                            temp1.append(groupedCourses[i][j])
                            #print(groupedCourses[i][j])     
              
                       
            if len(temp1) >0:
                container.append(temp1)
            if len(temp2) >0:
                container.append(temp2)
            if len(temp3) >0:
                container.append(temp3)
            if len(temp4) >0:
                container.append(temp4)
                       
            
            finalGroupedCourses.append(container)              
        
        #print(studentsArray[:100])
        # print("All the grouped courses are:")
        # print(finalGroupedCourses)
        
        selectedCourses=arr_courses.split(',')
        #print(selectedCourses)

        # print(len(selectedCourses))
        finalCourses=[]        
        
        for i in range(0,len(selectedCourses)):
            
            actualCourses=[]
            for j in range(0,len(finalGroupedCourses)):
                
                if len(selectedCourses[i].split(';'))>1:
                    theMergedCourses=selectedCourses[i].split(';')
                    for k in range(0,len(theMergedCourses)):
                        if theMergedCourses[k] in finalGroupedCourses[j][0][0]:
                            actualCourses.append(finalGroupedCourses[j][0][0])
              
                else:
                     if selectedCourses[i] in finalGroupedCourses[j][0][0]:
                            finalCourses.append(finalGroupedCourses[j])               
            

            if len(actualCourses)>0:
                temp=[]
                temp.append(actualCourses)
                finalCourses.append(temp)  

                    
        # print()
        # print("The selected courses are: ")
        # print(finalCourses)   
            
            
        
        #getCourseStudents(self,finalGroupedCourses,studentsArray)  
    
        final=[finalCourses,studentsArray]
        
        return final  
                
        
        
    # def Validate(self,allExamsList,regCourseList):
    #     exams=[]
    #     unscheduledExams=[]
    #     for i in range(0,len(regCourseList)):
    #         for exam in allExamList:
    #             if regCourseList[i] in exam:
    #                 exams.append(exam)
    #             else:
    #                 unscheduledExams.append(regCourseList[i])
                    
                    
    #     return exams 


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
            return True
        else:
            return False
    
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
        for i in range(0,vertexCount):
            self.vertexColours.append([])
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
    
    
    def setColour(self,vertex,resultArray):
        colour=-1
        usedColours=[]
        neighbours=self.getNeighbours(vertex)
        
        
        for i in range(0,len(neighbours)):
            if len(self.vertexColours[neighbours[i]])!=0:
                for j in range(0,len(self.vertexColours[neighbours[i]])):
                    if self.vertexColours[neighbours[i]][j] not in usedColours:
                        usedColours.append(self.vertexColours[neighbours[i]][j])
                

        
        for j in range(0,len(resultArray[vertex])):
           
            
            counter=0
            while True:
                if counter not in usedColours and counter not in self.vertexColours[vertex]:
                    colour=counter
                    break
                counter=counter+1
            
         
            self.vertexColours[vertex].append(colour)
            #print(self.vertexColours[vertex]) 
     
       # print(colour)
        
            


# In[64]:


extract=Extractor()
resultArray=extract.Read('myPapers.csv','myStudents.csv')

courseStudents=getCourseStudents(resultArray[0],resultArray[1]) 
#print(resultArray[1])
#print(resultArray[0])
#print(courseStudents)

#print(courseStudents[32])

theParameter=int(sys.argv[3])



while True:

    graph=GraphColouring(len(resultArray[0]),theParameter)
    diagArray = []
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
                
                if i==j:
                    #graph.NumStudents(i,j,graph.getWeight(courseStudents[i],courseStudents[j]))
                    diagArray.append(graph.getWeight(courseStudents[i],courseStudents[j]))
               
                    
                    

            elif graph.getWeight(courseStudents[i],courseStudents[j])!=0:

                temp=[]

                temp.append(i)
                temp.append(j)
                temp.append(graph.getWeight(courseStudents[i],courseStudents[j]))

                graph.clashes.append(temp)


    #print(graph.clashes)           

     #print(len(graph.adjacencyMatrix))

    #print(graph.adjacencyMatrix)
    sortingScheme=int(sys.argv[4])


    sortedVertices=[]
    
    #sorting by degree
    if sortingScheme == 0:   
        degrees=[]

        for i in range(0,len(graph.adjacencyMatrix)):
            degrees.append(graph.getDegree(i))
            #print(graph.degrees)    

        maxValue=max(degrees)+1
       

        for i in range(0,len(degrees)):
            index=degrees.index(min(degrees))
            sortedVertices.append(index)
            degrees[index]=maxValue
 
     
    #sorting by the number of students affected by a course   
    if sortingScheme == 1:
        tempp = []
        for i in range(0,len(graph.adjacencyMatrix)):

            sum=0
            for j in range(0,len(graph.adjacencyMatrix)):
                sum = sum + graph.adjacencyMatrix[i][j]
            tempp.append(sum)
        # print(tempp)
        minVal=min(tempp)-1
        for i in range(0,len(tempp)):
            index=tempp.index(max(tempp))
            sortedVertices.append(index)
            tempp[index]=minVal
    
    
 
    #sorting by number of students in the course
    if sortingScheme == 2:
        minVal=min(diagArray)-1
        for i in range(0,len(diagArray)):
            index=diagArray.index(max(diagArray))
            sortedVertices.append(index)
            diagArray[index]=minVal
 
        # print()
    if sortingScheme == 3:
        tempp = []
        for i in range(0,len(graph.adjacencyMatrix)):

            sum=0
            for j in range(0,len(graph.adjacencyMatrix)):
                sum = sum + graph.adjacencyMatrix[i][j]
            sum=sum-graph.adjacencyMatrix[i][i]   
            tempp.append(sum)
            
        # print(tempp)
        minVal=min(tempp)-1
        for i in range(0,len(tempp)):
            index=tempp.index(max(tempp))
            sortedVertices.append(index)
            tempp[index]=minVal


    
    #use SortedVertices2 to sort by different students affected by a course#
    #use SortedVertices to sort by degree#
    #use sVertices to sort by the number of students in a course
    #print("kats")

    for i in range(0,len(sortedVertices)):
        graph.setColour(sortedVertices[i],resultArray[0])
   
    sessions=[]
    sessionData=[]

    allColours=[]
    for k in range(0,len(graph.vertexColours)):
            for j in range(0,len(graph.vertexColours[k])):
                allColours.append(graph.vertexColours[k][j])
     
    for i in range(0,max(allColours)+1):
        temp=[]
        temp1=[]
        pair=[]
        for k in range(0,len(graph.vertexColours)):
            for j in range(0,len(graph.vertexColours[k])):
                if graph.vertexColours[k][j] == i:

                    temp.append(resultArray[0][k][j])


        sessions.append(temp)
       

    #print("The number of sessions are: ")
    #print(len(sessions))
    # print(sessionData)       

    examStudents=getExamStudents(sessions,resultArray[1])

    if len(sessions) > graph.maxSessions:
        theParameter=theParameter+1
    else:
        break
    # print("The parameter is:")
    # print(graph.clashParameter)
#We calculate the score by only penalising back to back days and back to back sessions
#Assign a penalty of 20 to back to back sessions in the same day.
#Assign a penalty of 10 to back to back sessions on different days
def getBackToBackClashes(theStudents):
    dayArray=[]
    if len(theStudents)%2==0:
        for i in range(0,len(theStudents)):
            if 2*i+1>len(theStudents)-1:
                break
            else:
                dayArray.append(list(set().union(theStudents[2*i],theStudents[2*i+1])))
    else:
        for i in range(0,len(theStudents)):
            if 2*i+1>len(theStudents)-1:
                break
            else:
                dayArray.append(list(set().union(theStudents[2*i],theStudents[2*i+1])))
          
        dayArray.append(theStudents[len(theStudents)-1])
    
    
    dayClashes=[]
    for i in range(0,len(dayArray)-1):
        dayClashes.append(list(set(dayArray[i]).intersection(dayArray[i+1])))
        
    return dayClashes

def getNumStudents(clashStudents):
    numStudents=0;
    for i in range(0,len(clashStudents)):
        numStudents=numStudents+len(clashStudents[i])
    return numStudents   

def getScore(sessionStudents):
    
    studentArray=[]
    score=0
    
    #score for same day students
    for i in range(0,len(sessionStudents)-1):
        common=list(set(sessionStudents[i]).intersection(sessionStudents[i+1]))
        if((i+1)%2!=0):
            score= score+500*len(common)
    #score for backtoback studets
    oldclashes=getBackToBackClashes(sessionStudents)
    score=score+getNumStudents(oldclashes)*50
    
    return score
def WorstStudentsTT(): 
    Studentswriting = []
    for i in range (0,len(examStudents)):
        for j in range(0,len(examStudents[i])):
             if examStudents[i][j] not in Studentswriting:
                    Studentswriting.append(examStudents[i][j])
  
    indexes = []
    for k in range(0,len(Studentswriting)):
        indivIndexes = []
        for i in range(0,len(examStudents)):
            if Studentswriting[k] in examStudents[i]:
                 indivIndexes.append(i)
        indexes.append(indivIndexes)            
    #indexes contains individual students session all stored in an array
    scores = []
    for i in range(0,len(indexes)):
        TotalScore = 0
        
        for j in range(0,len(indexes[i])-1):
            
             if((indexes[i][j+1])-(indexes[i][j]))==1 and ((indexes[i][j+1])%2 == 0):
                    TotalScore += 10
                     #to check if the length of array containing sessions  is not out of bounds
                    if j+2<len(indexes[i]) and (indexes[i][j+2])-(indexes[i][j+1])==1 and ((indexes[i][j+2])%3 == 0):
                        TotalScore += 5
                        # three sessions in 1 day
                    elif((indexes[i][j+1])-(indexes[i][j]))==1 and ((indexes[i][j+1])%3 == 0):
                            TotalScore += 10
                    else:
                          #general case for the case when the session number differences is more than or equal
                          #there is no much significance  
                            TotalScore += 1
                    
            #if ((indexes[i][j+1])-(indexes[i][j]))==1 and ((indexes[i][j+1])%2 != 0):      
                #score1 = (score1)+5      
            #if ((indexes[i][j+1])-(indexes[i][j]))>1:
                    #score3 = score3 + ((indexes[i][j+1])-(indexes[i][j]))
            
        
        scores.append(TotalScore) 
    StudentsSort = []
    
    for i in range(0,len(scores)):
        StudentsSort.append([Studentswriting[i],scores[i]])
    #print("StudentSort")
    #print(StudentsSort)
    
    
    #Sort pairs
    StudentsSort.sort(key=lambda x: x[1])
    #print("SortedList")
    #print(StudentsSort[::-1])
    
    #List of Worst Timetable Students
    WorstStudents = []
    for i in range(0,len(StudentsSort)):
        WorstStudents.append(StudentsSort[i][0])

    return WorstStudents
#we want score to be as high as possible since it represents the cumalitive study time all the students have 
#A reordering of these sessions might give a better result ie :
#I create an array containing differet permutations of the original timetable

def permute(sessions):
    
    theSessions=sessions[:]
    theStudents=examStudents
    
    for i in range(0,len(theSessions)):
        
        index1=random.randint(0,len(theSessions)-1)
        index2=random.randint(0,len(theSessions)-1)
        temp=theSessions[index1]
        theSessions[index1]=theSessions[index2]
        theSessions[index2]=temp
   
        
        temp2=theStudents[index1]
        theStudents[index1]=theStudents[index2]
        theStudents[index2]=temp2
        
        
        
    result=[]
    result.append(theSessions)
    result.append(theStudents)
    
    return result

   
populationSize=1000
def populate(session,populationSize):
    population=[]
    temp=session[:]
    
    temp.append(getScore(examStudents))
   
    population.append(temp)
   
    
    while len(population)<populationSize:
        temp2 = session[:]
        result=permute(temp2)
        array=result[0]
        array.append(getScore(getExamStudents(array,resultArray[1])))
        population.append(array)
        
    return population

thePopulation=populate(sessions,populationSize) 

#Now that we've got the permutations we need to give each permutation a score andd then regenerate on "fittest"



# In[49]:


def Breed(parent1,parent2):
    
    parent1=parent1[:-1]
    parent2=parent2[:-1]
    
    children=[]
    venus=[]
    serena=[]
   
    startIndex=random.randint(0,math.floor(len(parent1)/2))
    for i in range(startIndex,2*startIndex):
        venus.append(parent1[i])
        
    for j in range(0,len(parent1)):
        if parent1[j] not in venus:
            serena.append(parent1[j])
        
    
    
    for k in range(0,len(parent2)):
        if parent2[k] not in venus:
            venus.append(parent2[k])
            
    for l in range(0,len(parent2)):
        if parent2[l] not in serena:
            serena.append(parent2[l])
    
    venus.append(getScore(getExamStudents(venus,resultArray[1])))    
    serena.append(getScore(getExamStudents(serena,resultArray[1])))  
    
    #print("Introducing, venus")
   # print(venus)
    
    
    
    newGeneration.append(serena)
    newGeneration.append(venus)
    
      
        
    return newGeneration
#Now we must sort these by the last index
#We take the top n organisms and discard the rest
#Allow top n to breed until there are 90 total organisms
#Now we must sort these by the last index
#We take the top n organisms and discard the rest

generation=0
numGenerations=10
while generation < numGenerations:
  
    sortedArray=sorted(thePopulation,key=operator.itemgetter(len(thePopulation[0])-1))
    sortedArray=sortedArray[:10]
    newGeneration=sortedArray
    size=len(newGeneration)
    while len(newGeneration) < populationSize:
        index1=random.randint(0,size-1)
        index2=random.randint(0,size-1)
        if index1!=index2:
            thePopulation=Breed(newGeneration[index1],newGeneration[index2])
           
    #print(len(thePopulation[0])
    #thePopulation=list(set(thePopulation))
    generation=generation+1
    #thePopulation=sorted(thePopulation,key=operator.itemgetter(11))

#print(thePopulation)
thePopulation=sorted(thePopulation,key=operator.itemgetter(len(thePopulation[0])-1))

#print(thePopulation[0])    
finalSession=thePopulation[0][:-1]

#print("The final session after optimization is: ")
#print(finalSession)
finalExamStudents=getExamStudents(finalSession,resultArray[1])
#print("Final score is")
#print(getScore(finalExamStudents))
#print(thePopulation)
#print(finalExamStudents)

theSession=[]

for i in range(0,len(finalSession)):
    temp=[]
    for j in range(0,len(finalSession[i])):
        truth=1
        if len(finalSession[i][j])>1:
            theSession.append(finalSession[i][j])
            truth=0
        else:
            temp.append(finalSession[i][j][0])
        
    if truth:    
        theSession.append(temp) 
    
    
for i in range(0,len(theSession)):
    if len(theSession[i]) == 0:
        del theSession[i]
        
    

      
def SameDayClashes(theStudent):
    temp=[]
    for i in range(0,len(theStudent)):
        if 2*i+1 > len(theStudent)-1:
            break
        else:    
            temp.append(list(set(theStudent[2*i]).intersection(theStudent[2*i+1])))
    return temp      
    
clashes=SameDayClashes(finalExamStudents)

#Number of students that write in the same day:


numSomeDayStudents=getNumStudents(clashes)

 
 
dayClashes=getBackToBackClashes(finalExamStudents)
numBackToBackStudents=getNumStudents(dayClashes)
worstTimeTable=WorstStudentsTT();

summaryData=[]

summaryData.append(numSomeDayStudents)
summaryData.append(numBackToBackStudents)
summaryData.append(len(graph.clashes)/2)
summaryData.append(worstTimeTable)

theSession.append(summaryData)   
print(json.dumps(theSession))

# In[ ]:



    
    
    
    




