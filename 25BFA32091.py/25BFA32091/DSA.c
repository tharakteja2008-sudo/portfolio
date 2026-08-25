#include <stdio.h> 
#include <stdlib.h> 
// Define the AVL tree node structure 
typedef struct AVLNode { 
int key; 
struct AVLNode *left; 
struct AVLNode *right; 
int height; 
} AVLNode; 
// Function prototypes 
AVLNode* createNode(int key); 
int height(AVLNode* node); 
int max(int a, int b); 
AVLNode* rightRotate(AVLNode* y); 
AVLNode* leftRotate(AVLNode* x); 
int getBalance(AVLNode* node); 
AVLNode* insert(AVLNode* node, int key); 
AVLNode* minValueNode(AVLNode* node); 
AVLNode* deleteNode(AVLNode* root, int key); 
void inOrderTraversal(AVLNode* root); 
void freeTree(AVLNode* root); 
// Create a new AVL Node 
AVLNode* createNode(int key) { 
AVLNode* node = (AVLNode*)malloc(sizeof(AVLNode)); 
node->key = key; 
node->left = NULL; 
node->right = NULL; 
node->height = 1; 
return node; 
} 
// Get the height of the node 
int height(AVLNode* node) { 
return node ? node->height : 0; 
} 
// Get the maximum of two integers 
int max(int a, int b) { 
Prepared by 
Dr.B.Lakshmi Devi,Associate Professor, Dept of CSE 
(Data Science) 
SVCE, Tirupati. 
return (a > b) ? a : b; 
} 
// Right rotate utility 
AVLNode* rightRotate(AVLNode* y) { 
AVLNode* x = y->left; 
AVLNode* T2 = x->right; 
x->right = y; 
y->left = T2; 
y->height = max(height(y->left), height(y->right)) + 1; 
x->height = max(height(x->left), height(x->right)) + 1; 
return x; 
} 
// Left rotate utility 
AVLNode* leftRotate(AVLNode* x) { 
AVLNode* y = x->right; 
AVLNode* T2 = y->left; 
y->left = x; 
x->right = T2; 
x->height = max(height(x->left), height(x->right)) + 1; 
y->height = max(height(y->left), height(y->right)) + 1; 
return y; 
} 

int getBalance(AVLNode* node){ 
return node ? height(node->left) - height(node->right) : 0; 
} 
// Insert a node into the AVL tree 
AVLNode* insert(AVLNode* node, int key) { 
if (node == NULL) 
return createNode(key); 
if (key < node->key) 
node->left = insert(node->left, key); 
else if (key > node->key) 
node->right = insert(node->right, key); 
else 
return node; // Duplicate keys are not allowed 
node->height = 1 + max(height(node->left), height(node->right)); 
int balance = getBalance(node); 
// Left Left Case 
if (balance > 1 && key < node->left->key) 
Prepared by 
Dr.B.Lakshmi Devi,Associate Professor, Dept of CSE 
(Data Science) 
SVCE, Tirupati. 
return rightRotate(node); 
// Right Right Case 
if (balance < -1 && key > node->right->key) 
return leftRotate(node); 
// Left Right Case 
if (balance > 1 && key > node->left->key) { 
node->left = leftRotate(node->left); 
return rightRotate(node); 
} 
// Right Left Case 
if (balance < -1 && key < node->right->key) { 
node->right = rightRotate(node->right); 
return leftRotate(node); 
} 
return node; 
} 
// Find the node with the smallest key greater than the node 
AVLNode* minValueNode(AVLNode* node) { 
AVLNode* current = node; 
while (current->left != NULL) 
current = current->left; 
return current; 
} 
// Delete a node from the AVL tree 
AVLNode* deleteNode(AVLNode* root, int key) { 
if (root == NULL) 
return root; 
if (key < root->key) 
root->left = deleteNode(root->left, key); 
else if (key > root->key) 
root->right = deleteNode(root->right, key); 
else { 
if ((root->left == NULL) || (root->right == NULL)) { 
AVLNode* temp = root->left ? root->left : root->right; 
if (temp == NULL) { 
temp = root; 
root = NULL; 
} else 
*root = *temp; 
free(temp); 
} else { 
Prepared by 
Dr.B.Lakshmi Devi,Associate Professor, Dept of CSE 
(Data Science) 
SVCE, Tirupati. 
AVLNode* temp = minValueNode(root->right); 
root->key = temp->key; 
root->right = deleteNode(root->right, temp->key); 
} 
} 
if (root == NULL) 
return root; 
root->height = 1 + max(height(root->left), height(root->right)); 
int balance = getBalance(root); 
// Left Left Case 
if (balance > 1 &&getBalance(root->left) >= 0) 
return rightRotate(root); 
// Left Right Case 
if (balance > 1 &&getBalance(root->left) < 0) { 
root->left = leftRotate(root->left); 
return rightRotate(root); 
} 
// Right Right Case 
if (balance < -1 &&getBalance(root->right) <= 0) 
return leftRotate(root); 
// Right Left Case 
if (balance < -1 &&getBalance(root->right) > 0) { 
root->right = rightRotate(root->right); 
return leftRotate(root); 
} 
return root; 
} 
// In-order traversal to print tree contents 
void inOrderTraversal(AVLNode* root) { 
if (root != NULL) { 
inOrderTraversal(root->left); 
printf("%d\n", root->key); 
inOrderTraversal(root->right); 
} 
} 
// Free allocated memory for the AVL tree 
void freeTree(AVLNode* root) { 
if (root != NULL) { 
Prepared by 
Dr.B.Lakshmi Devi,Associate Professor, Dept of CSE 
(Data Science) 
SVCE, Tirupati. 
freeTree(root->left); 
freeTree(root->right); 
free(root); 
} 
} 
int main() { 
AVLNode* root = NULL; 
int choice, key; 
while (1) { 
printf("\nAVL Tree Operations:\n"); 
printf("1. Insert\n"); 
printf("2. Delete\n"); 
printf("3. Display In-Order Traversal\n"); 
printf("4. Exit\n"); 
printf("Enter your choice: "); 
scanf("%d", &choice); 
switch (choice) { 
case 1: // Insert 
printf("Enter key to insert: "); 
scanf("%d", &key); 
root = insert(root, key); 
printf("Key %d inserted successfully.\n", key); 
break; 
case 2: // Delete 
printf("Enter key to delete: "); 
scanf("%d", &key); 
root = deleteNode(root, key); 
printf("Key %d deleted successfully.\n", key); 
break; 
case 3: // Display In-Order Traversal 
printf("In-Order Traversal:\n"); 
inOrderTraversal(root); 
break; 
case 4: // Exit 
freeTree(root); 
printf("Exiting...\n"); 
return 0; 
default: 
printf("Invalid choice. Please try again.\n"); 
break; 
} 
} 
}